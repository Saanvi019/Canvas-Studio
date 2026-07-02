import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function HeroRenderer({ component, selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={700}
        height={220}
        fill="#ffffff"
        stroke={selected ? "#3B82F6" : "#CBD5E1"}
        strokeWidth={selected ? 4 : 2}
        cornerRadius={18}
      />

      <Text
        x={40}
        y={50}
        text={component.content ?? "Hero"}
        fontSize={34}
        fontStyle="bold"
        fill="#111827"
      />

      <Rect
        x={40}
        y={145}
        width={180}
        height={46}
        fill="#7C3AED"
        cornerRadius={10}
      />

      <Text x={82} y={158} text="Get Started" fill="white" fontSize={18} />
    </Group>
  );
}
