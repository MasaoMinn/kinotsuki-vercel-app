"use client"
import Bubble from "@/components/layout/Bubble";
import MatterDemo, { BubblesBoardHandle } from "@/components/layout/BubblesBoard";
import { useRef } from "react";
import { useTranslation } from 'react-i18next'

export default function IdentityShowcase() {
  const ref = useRef<BubblesBoardHandle>(null);
  const list = ['furry', 'cpp', 'react', 'pingpong', 'mbti'];
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <MatterDemo ref={ref} width={1200} height={900} gravity={0.3} ground interact>
        {list.map((item, index) => (
          <Bubble key={index} shape="circle 60" x={200 + index * 100} y={60} text={t(`mainpage.bubbles.${item}`)} />
        ))}
      </MatterDemo>

      <div className="space-x-2">
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
