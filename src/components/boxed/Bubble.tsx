"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Matter from "matter-js";

interface BubbleProps {
  body: Matter.Body;
  bgColor: string;
  textColor: string;
  shape: "circle" | "ellipse" | "rectangle" | "triangle";
  size: number;
  children?: React.ReactNode;
}

const Bubble: React.FC<BubbleProps> = ({
  body,
  bgColor,
  textColor,
  shape,
  size,
  children,
}) => {
  const [pos, setPos] = useState(body.position);
  const [angle, setAngle] = useState(body.angle);

  useEffect(() => {
    let frame: number;
    const update = () => {
      setPos({ ...body.position });
      setAngle(body.angle);
      frame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frame);
  }, [body]);

  const borderRadius =
    shape === "circle"
      ? "50%"
      : shape === "ellipse"
        ? "70% / 50%"
        : shape === "rectangle"
          ? "12px"
          : "0";

  const triangleClip =
    shape === "triangle"
      ? "polygon(50% 0%, 0% 100%, 100% 100%)"
      : undefined;

  return (
    <motion.div
      className="absolute flex items-center justify-center shadow-md select-none cursor-grab active:cursor-grabbing user-select-none"
      style={{
        width: size,
        height: size,
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        backgroundColor: bgColor,
        color: textColor,
        borderRadius,
        clipPath: triangleClip,
        transform: `rotate(${angle}rad)`,
        fontWeight: 500,
        // 添加以下CSS属性确保内容不可被选中
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        // 防止文本选择光标
        cursor: 'grab',
        // 禁用触摸设备上的高亮
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </motion.div>
  );
};

export default Bubble;