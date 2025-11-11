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
  World,
} from "matter-js";

export interface MatterDemoHandle {
  start: () => void;
  pause: () => void;
  reset: () => void;
  getEngine: () => Engine | null;
}

export interface MatterDemoProps {
  width?: number;
  height?: number;
  background?: string;
  wireframes?: boolean;
  autoRun?: boolean;
  createBodies?: (ctx: {
    Engine: typeof Engine;
    Render: typeof Render;
    Runner: typeof Runner;
    Bodies: typeof Bodies;
    Composite: typeof Composite;
    Body: typeof Body;
    World: typeof World;
  }) => Body[];
  className?: string;
}

const MatterDemo = forwardRef<MatterDemoHandle, MatterDemoProps>(
  (
    {
      width = 800,
      height = 600,
      background = "#f8fafc",
      wireframes = false,
      autoRun = true,
      createBodies,
      className = "",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Engine | null>(null);
    const renderRef = useRef<Render | null>(null);
    const runnerRef = useRef<Runner | null>(null);
    const [isRunning, setIsRunning] = useState(autoRun);

    const initializeMatter = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const engine = Engine.create();
      const render = Render.create({
        element: container,
        engine,
        options: {
          width,
          height,
          background,
          wireframes,
        },
      });
      const runner = Runner.create();

      engineRef.current = engine;
      renderRef.current = render;
      runnerRef.current = runner;

      const defaultBodies: Body[] = [
        Bodies.rectangle(400, 200, 80, 80),
        Bodies.rectangle(450, 50, 80, 80),
        Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
      ];

      const bodies =
        createBodies?.({
          Engine,
          Render,
          Runner,
          Bodies,
          Composite,
          Body,
          World,
        }) ?? defaultBodies;

      Composite.add(engine.world, bodies);

      if (autoRun) {
        Render.run(render);
        Runner.run(runner, engine);
        setIsRunning(true);
      }
    }, [width, height, background, wireframes, autoRun, createBodies]);

    const cleanupMatter = useCallback(() => {
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
      initializeMatter();
      return cleanupMatter;
    }, [initializeMatter, cleanupMatter]);

    useImperativeHandle(ref, (): MatterDemoHandle => ({
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
        cleanupMatter();
        initializeMatter();
      },
      getEngine: () => engineRef.current,
    }));

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl border shadow-sm ${className}`}
        style={{ width, height }}
      />
    );
  }
);

MatterDemo.displayName = "MatterDemo";

export default MatterDemo;
