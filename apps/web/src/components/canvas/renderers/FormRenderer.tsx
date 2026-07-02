import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function FormRenderer({ selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Rect
        width={320}
        height={180}
        fill="#F8FAFC"
        stroke={selected ? "#3B82F6" : "#CBD5E1"}
        strokeWidth={selected ? 4 : 2}
        cornerRadius={12}
      />

      <Rect
        x={20}
        y={25}
        width={280}
        height={36}
        fill="white"
        stroke="#CBD5E1"
      />

      <Rect
        x={20}
        y={75}
        width={280}
        height={36}
        fill="white"
        stroke="#CBD5E1"
      />

      <Rect
        x={20}
        y={130}
        width={120}
        height={34}
        fill="#7C3AED"
        cornerRadius={8}
      />

      <Text x={45} y={140} text="Submit" fill="white" />
    </Group>
  );
}
