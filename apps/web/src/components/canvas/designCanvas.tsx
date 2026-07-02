"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { Group, Rect, Text } from "react-konva";
import { useDesignStore } from "../../store/designStore";
import type { DesignComponent } from "@repo/types";
import { renderComponent } from "./renderComponent";

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

  return (
    <div ref={containerRef} className="w-full h-full">
      <Stage
        width={size.width}
        height={size.height}
        onClick={() => selectComponent(null)}
      >
        <Layer>
          {designModel?.components.map((component, index) => (
            <Group key={component.id} x={80} y={60 + index * 260}>
              {renderComponent({
                component,
                selected: selectedComponentId === component.id,
                onSelect: () => selectComponent(component.id),
              })}
            </Group>
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
