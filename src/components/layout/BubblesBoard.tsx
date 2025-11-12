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
  gravity?: number;
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
      gravity = 1,
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
          Bodies.rectangle(width / 2, height - 2, width, 1, {
            isStatic: true,
            restitution: 1,
            friction: 0.5,
          })
        );
      }

      if (box) {
        const w = 1;
        staticBodies.push(
          Bodies.rectangle(width / 2, -w / 2, width, w, { isStatic: true }), // top
          Bodies.rectangle(width + w / 2, height / 2, w, height, { isStatic: true }), // right
          Bodies.rectangle(-w / 2, height / 2, w, height, { isStatic: true }) // left
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

      if (autoRun) {
        Render.run(render);
        Runner.run(runner, engine);
        setIsRunning(true);
      }
    }, [width, height, background, wireframes, autoRun, children, ground, box, gravity]);

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
