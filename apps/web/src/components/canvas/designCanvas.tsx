"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Group, Rect, Text } from "react-konva";
import { useDesignStore } from "../../store/designStore";
import type { DesignComponent } from "@repo/types";

export default function DesignCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { designModel, selectedComponentId, selectComponent } =
    useDesignStore();

  const [size, setSize] = useState({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    function updateSize() {
      if (!containerRef.current) return;

      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function renderComponent(component: DesignComponent, index: number) {
    return (
      <Group
        key={component.id}
        x={80}
        y={60 + index * 150}
        onClick={(e) => {
          e.cancelBubble = true;
          selectComponent(component.id);
        }}
      >
        <Rect
          width={320}
          height={100}
          fill="#ffffff"
          stroke={selectedComponentId === component.id ? "#3B82F6" : "#CBD5E1"}
          strokeWidth={selectedComponentId === component.id ? 4 : 2}
          cornerRadius={12}
        />

        <Text
          text={component.type.toUpperCase()}
          x={16}
          y={14}
          fontStyle="bold"
          fontSize={14}
          fill="#7C3AED"
        />

        <Text
          text={component.content ?? ""}
          x={16}
          y={44}
          width={280}
          fontSize={18}
          fill="#111827"
        />
      </Group>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage
        width={size.width}
        height={size.height}
        onClick={() => selectComponent(null)}
      >
        <Layer>{designModel?.components.map(renderComponent)}</Layer>
      </Stage>
    </div>
  );
}
