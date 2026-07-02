import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function NavRenderer({ component, selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={720}
        height={70}
        fill="#FFFFFF"
        stroke={selected ? "#3B82F6" : "#CBD5E1"}
        strokeWidth={selected ? 4 : 2}
        cornerRadius={10}
      />

      <Text
        x={20}
        y={24}
        text={component.content ?? "LOGO"}
        fontSize={20}
        fontStyle="bold"
      />

      <Text x={450} y={24} text="Home    About    Contact" fontSize={16} />
    </Group>
  );
}
