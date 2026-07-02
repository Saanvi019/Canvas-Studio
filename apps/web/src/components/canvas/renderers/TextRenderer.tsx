import { Group, Text } from "react-konva";
import type { DesignComponent } from "@repo/types";

interface Props {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export default function TextRenderer({ component, selected, onSelect }: Props) {
  return (
    <Group
      onClick={(e) => {
        e.cancelBubble = true;
        onSelect();
      }}
    >
      <Text text={component.content ?? "Text"} fontSize={18} fill="#111827" />

      {selected && <Text y={-20} text="TEXT" fontSize={12} fill="#3B82F6" />}
    </Group>
  );
}
