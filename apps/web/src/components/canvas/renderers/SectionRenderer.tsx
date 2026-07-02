import { Group, Rect, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function SectionRenderer({
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
        width={760}
        height={260}
        fill="#F8FAFC"
        stroke={selected ? "#3B82F6" : "#CBD5E1"}
        strokeWidth={selected ? 4 : 2}
        dash={[8, 6]}
        cornerRadius={12}
      />

      <Text
        x={20}
        y={15}
        text="SECTION"
        fontSize={16}
        fontStyle="bold"
        fill="#64748B"
      />

      <Text
        x={20}
        y={45}
        text={`${component.children?.length ?? 0} child component(s)`}
        fontSize={14}
        fill="#94A3B8"
      />
    </Group>
  );
}
