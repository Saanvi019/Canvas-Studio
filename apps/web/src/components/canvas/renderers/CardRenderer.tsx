import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function CardRenderer({ component, selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={300}
        height={180}
        fill="#ffffff"
        stroke={selected ? "#3B82F6" : "#CBD5E1"}
        strokeWidth={selected ? 4 : 2}
        cornerRadius={16}
      />

      <Rect
        x={20}
        y={20}
        width={260}
        height={70}
        fill="#E2E8F0"
        cornerRadius={10}
      />

      <Text
        x={20}
        y={110}
        width={260}
        text={component.content ?? "Card"}
        fontSize={18}
        fill="#111827"
      />
    </Group>
  );
}
