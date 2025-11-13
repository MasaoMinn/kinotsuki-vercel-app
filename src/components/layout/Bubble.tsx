"use client";
import { parseBubbleShape } from "@/utils/bubbleShapeParser";
import { Bodies, Body, IChamferableBodyDefinition } from "matter-js";
import Image from "next/image";

// 修改BubbleProps接口，让它继承div元素的props
export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  shape: string;
  text?: string;
  image?: string;
  // 移除style和className，因为它们已经在HTMLAttributes中定义了

  x: number;
  y: number;

  // Matter.js 物理属性
  restitution?: number; // 弹力
  friction?: number; // 摩擦力
  frictionAir?: number; // 空气阻力
  density?: number; // 密度
  mass?: number; // 质量
  isStatic?: boolean;
}

/**
 * Bubble 组件
 * - 用于 UI 展示和 Matter.js 物体定义
 * - 可调用 createBody() 生成一个物理对象
 */
const Bubble: React.FC<BubbleProps> & {
  createBody: (props: BubbleProps) => Body;
} = ({
  text,
  image,
  // 使用剩余参数收集所有HTML div props
  ...divProps
}) => {
    // 从divProps中解构出style和className，因为我们需要合并它们
    const { style, className, x = 0, y = 0, ...otherDivProps } = divProps;

    return (
      <div
        className={`absolute flex items-center justify-center text-center select-none ${className || ""}`}
        style={{
          left: x,
          top: y,
          width: 80,
          height: 80,
          backgroundColor: style?.backgroundColor || "#60a5fa",
          color: style?.color || "#000000ff",
          fontWeight: 600,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          ...style,
        }}
        {...otherDivProps} // 传递剩余的div props
      >
        {image ? (
          <Image
            src={image}
            alt={text || ""}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          text
        )}
      </div>
    );
  };

/**
 * 根据 BubbleProps 生成一个 Matter.js 物理 Body
 */
Bubble.createBody = ({
  shape = "circle 10",
  style,
  restitution = 0.6,
  friction = 0.3,
  frictionAir = 0.01,
  density = 0.001,
  mass,
  x = 0,
  y = 0,
  isStatic = false,
}: BubbleProps): Body => {
  const options: IChamferableBodyDefinition = {
    restitution,
    friction,
    frictionAir,
    density,
    isStatic: isStatic,
    render: {
      fillStyle: style?.backgroundColor || "#3b82f6",
    },
  };

  let body: Body;
  const { type, params } = parseBubbleShape(shape);
  switch (type) {
    case "rectangle":
      body = Bodies.rectangle(x, y, params[0], params[1], options);
      break;
    case "triangle":
      const triangleVertices = [
        { x: 0, y: -params[0] / 2 },
        { x: -params[1] / 2, y: params[0] / 2 },
        { x: params[1] / 2, y: params[0] / 2 },
      ];
      body = Bodies.fromVertices(x, y, [triangleVertices], options)!;
      break;
    case "circle":
      body = Bodies.circle(x, y, params[0], options);
    default:
      body = Bodies.circle(x, y, params[0], options);
  }

  if (mass) Body.setMass(body, mass);
  return body;
};

export default Bubble;