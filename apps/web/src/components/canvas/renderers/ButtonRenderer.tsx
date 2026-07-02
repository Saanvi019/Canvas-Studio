import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function ButtonRenderer({
  component,
  selected,
  onSelect,
}: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={220}
        height={60}
        fill="#7C3AED"
        cornerRadius={12}
        stroke={selected ? "#3B82F6" : undefined}
        strokeWidth={selected ? 4 : 0}
      />

      <Text
        width={220}
        align="center"
        y={20}
        text={component.content ?? "Button"}
        fill="white"
        fontSize={18}
      />
    </Group>
  );
}
