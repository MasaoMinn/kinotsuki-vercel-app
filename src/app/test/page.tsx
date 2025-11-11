"use client"
import MatterDemo, { MatterDemoHandle } from "@/components/layout/BubblesBoard";
import { useRef } from "react";

export default function Page() {
  const ref = useRef<MatterDemoHandle>(null);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <MatterDemo ref={ref} width={800} height={600} background="#f0f9ff" />

      <div className="space-x-2">
        <button
          onClick={() => ref.current?.start()}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          ▶️ Start
        </button>
        <button
          onClick={() => ref.current?.pause()}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          ⏸ Pause
        </button>
        <button
          onClick={() => ref.current?.reset()}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
