"use client";

import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Body,
  Mouse,
  MouseConstraint,
} from "matter-js";
import React from "react";
import Image from "next/image";
import Matter from "matter-js";
import Bubble, { BubbleProps } from "./Bubble";

export interface BubblesBoardHandle {
  start: () => void;
  pause: () => void;
  reset: () => void;
  getEngine: () => Engine | null;
}

export interface BubblesBoardProps {
  width?: number;
  height?: number;
  background?: string;
  wireframes?: boolean;
  autoRun?: boolean;
  className?: string;
  children?: React.ReactElement<BubbleProps>[];
  ground?: boolean;
  box?: boolean;
  boarderWidth?: number;
  boarderColor?: string;
  gravity?: number;
  interact?: boolean;
}

const BubblesBoard = forwardRef<BubblesBoardHandle, BubblesBoardProps>(
  (
    {
      width = 800,
      height = 600,
      background = "#f8fafc",
      wireframes = false,
      autoRun = true,
      className = "",
      children,
      ground = true,
      box = true,
      boarderWidth: boxWidth = 5,
      boarderColor = "#00eeffe4",
      gravity = 1,
      interact = false,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Engine | null>(null);
    const renderRef = useRef<Render | null>(null);
    const runnerRef = useRef<Runner | null>(null);
    const [isRunning, setIsRunning] = useState(autoRun);
    const [bubbles, setBubbles] = useState<{ id: number; body: Body; props: BubbleProps }[]>([]);
    const imageStates = useRef<Map<string, { loaded: boolean; error: boolean }>>(new Map());

    const initialize = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const engine = Engine.create();
      engine.gravity.y = Math.max(0, Math.min(1, gravity));

      const render = Render.create({
        element: container,
        engine,
        options: { width, height, background, wireframes },
      });
      if (render.canvas) {
        render.canvas.style.position = 'absolute';
        render.canvas.style.top = '0';
        render.canvas.style.left = '0';
        render.canvas.style.margin = '0';
        render.canvas.style.padding = '0';
        render.canvas.style.zIndex = '10';
      }
      const runner = Runner.create();

      engineRef.current = engine;
      renderRef.current = render;
      runnerRef.current = runner;

      const staticBodies: Body[] = [];
      if (ground) {
        staticBodies.push(
          Bodies.rectangle(width / 2, height - 1, width, boxWidth, {
            isStatic: true,
            restitution: 1,
            friction: 0.2,
            render: {
              fillStyle: boarderColor,
            }
          })
        );
      }

      if (box) {
        const w = boxWidth;
        staticBodies.push(
          Bodies.rectangle(width / 2, w / 2, width, w, {
            isStatic: true,
            restitution: 1,
            friction: 0.2,
            render: {
              fillStyle: boarderColor,
            }
          }), // top
          Bodies.rectangle(width - w / 2, height / 2, w, height, {
            isStatic: true,
            restitution: 1,
            friction: 0.2,
            render: {
              fillStyle: boarderColor,
            }
          }), // right
          Bodies.rectangle(w / 2, height / 2, w, height, {
            isStatic: true,
            restitution: 1,
            friction: 0.2,
            render: {
              fillStyle: boarderColor,
            }
          }), // left
          Bodies.rectangle(width / 2, height - 1, width, boxWidth, {
            isStatic: true,
            restitution: 1,
            friction: 0.2,
            render: {
              fillStyle: boarderColor,
            }
          }), // bottom
        );
      }

      const bodies: Body[] = [...staticBodies];
      const newBubbles: { id: number; body: Body; props: BubbleProps }[] = [];

      if (children && React.Children.count(children) > 0) {
        React.Children.forEach(children, (child, i) => {
          if (React.isValidElement<BubbleProps>(child) && child.type === Bubble) {
            const body = Bubble.createBody(child.props);
            bodies.push(body);
            newBubbles.push({ id: i, body, props: child.props });

            if (child.props.image) {
              imageStates.current.set(child.props.image, { loaded: false, error: false });
            }
          }
        });
      }

      setBubbles(newBubbles);
      Composite.add(engine.world, bodies);

      if (interact && render.canvas) {
        render.canvas.style.pointerEvents = 'auto';
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
          },
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;
      } else if (render.canvas) {
        render.canvas.style.pointerEvents = 'none';
      }

      Matter.Events.on(engine, 'afterUpdate', () => {
        setBubbles(prev => prev.map(bubble => ({
          ...bubble,
          body: bubble.body
        })));
      });

      if (autoRun) {
        Render.run(render);
        Runner.run(runner, engine);
        setIsRunning(true);
      }
    }, [width, height, background, wireframes, autoRun, children, ground, box, gravity, interact, boxWidth, boarderColor]);

    const cleanup = useCallback(() => {
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.textures = {};
      }
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Matter.Events.off(engineRef.current, 'afterUpdate');
        Engine.clear(engineRef.current);
      }
      engineRef.current = null;
      renderRef.current = null;
      runnerRef.current = null;
      setIsRunning(false);
    }, []);

    useEffect(() => {
      initialize();
      return cleanup;
    }, [initialize, cleanup]);

    useImperativeHandle(ref, (): BubblesBoardHandle => ({
      start: () => {
        const engine = engineRef.current;
        const render = renderRef.current;
        const runner = runnerRef.current;
        if (!engine || !render || !runner || isRunning) return;
        Render.run(render);
        Runner.run(runner, engine);
        setIsRunning(true);
      },
      pause: () => {
        const render = renderRef.current;
        const runner = runnerRef.current;
        if (!render || !runner || !isRunning) return;
        Render.stop(render);
        Runner.stop(runner);
        setIsRunning(false);
      },
      reset: () => {
        cleanup();
        initialize();
      },
      getEngine: () => engineRef.current,
    }));

    const handleImageLoad = useCallback((src: string) => {
      imageStates.current.set(src, { loaded: true, error: false });
      setBubbles(prev => [...prev]);
    }, []);

    const handleImageError = useCallback((src: string) => {
      imageStates.current.set(src, { loaded: false, error: true });
      setBubbles(prev => [...prev]);
    }, []);

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl border shadow ${className}`}
        style={{ width, height }}
      >
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ zIndex: 20, pointerEvents: 'none' }}>
          {bubbles.map(({ id, body, props }) => {
            let bubbleWidth: number;
            let bubbleHeight: number;

            if (body.circleRadius) {
              bubbleWidth = bubbleHeight = body.circleRadius * 2;
            } else if (body.bounds) {
              bubbleWidth = body.bounds.max.x - body.bounds.min.x;
              bubbleHeight = body.bounds.max.y - body.bounds.min.y;
            } else {
              bubbleWidth = bubbleHeight = 80;
            }

            const { x, y } = body.position;
            const angle = body.angle;
            const imageState = props.image ? imageStates.current.get(props.image) : undefined;

            return (
              <div
                key={id}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  width: `${bubbleWidth}px`,
                  height: `${bubbleHeight}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                  backgroundColor: props.style?.backgroundColor,
                  borderRadius: props.style?.borderRadius || '50%',
                  border: props.style?.border || 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  zIndex: 30,
                }}
              >
                {props.image && !imageState?.error && (
                  <div className="absolute inset-0 w-full h-full">
                    {!imageState?.loaded && (
                      <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-full" />
                    )}
                    <Image
                      src={props.image}
                      alt={props.text || "Bubble image"}
                      fill
                      style={{
                        objectFit: 'cover',
                        opacity: imageState?.loaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out'
                      }}
                      onLoad={() => handleImageLoad(props.image!)}
                      onError={() => handleImageError(props.image!)}
                      priority
                    />
                  </div>
                )}
                {props.text ? (
                  <span
                    className="relative z-30"
                    style={{
                      fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
                      color: props.image && !props.style?.color ? '#ffffff' : (props.style?.color || '#000000'),
                      fontWeight: 700,
                      textAlign: 'center',
                      lineHeight: '1.3',
                      textShadow: props.image ? '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5)' : '1px 1px 2px rgba(255,255,255,0.8)',
                      pointerEvents: 'none',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '0',
                    }}
                  >
                    {props.text}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

BubblesBoard.displayName = "BubblesBoard";
export default BubblesBoard;