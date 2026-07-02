import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function ImageRenderer({ selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={240}
        height={150}
        fill="#E5E7EB"
        stroke={selected ? "#3B82F6" : "#94A3B8"}
        strokeWidth={selected ? 4 : 2}
        cornerRadius={10}
      />

      <Text width={240} y={65} align="center" text="Image" fill="#475569" />
    </Group>
  );
}
