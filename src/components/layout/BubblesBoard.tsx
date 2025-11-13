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

      if (children && React.Children.count(children) > 0) {
        React.Children.forEach(children, (child) => {
          if (React.isValidElement<BubbleProps>(child) && child.type === Bubble) {
            const body = Bubble.createBody(child.props);
            bodies.push(body);
          }
        });
      }

      Composite.add(engine.world, bodies);

      if (interact && render.canvas) {
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
          },
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;
      }
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
      if (engineRef.current) Engine.clear(engineRef.current);
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

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl border shadow ${className}`}
        style={{ width, height }}
      />
    );
  }
);

BubblesBoard.displayName = "BubblesBoard";
export default BubblesBoard;