import type { DesignComponent } from "@repo/types";

import HeroRenderer from "./renderers/HeroRenderer";
import ButtonRenderer from "./renderers/ButtonRenderer";
import CardRenderer from "./renderers/CardRenderer";
import TextRenderer from "./renderers/TextRenderer";
import ImageRenderer from "./renderers/ImageRenderer";
import FormRenderer from "./renderers/FormRenderer";
import NavRenderer from "./renderers/NavRenderer";
import SectionRenderer from "./renderers/SectionRenderer";

interface RenderProps {
  component: DesignComponent;
  selected: boolean;
  onSelect: () => void;
}

export function renderComponent({
  component,
  selected,
  onSelect,
}: RenderProps) {
  switch (component.type) {
    case "hero":
      return (
        <HeroRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );

    case "button":
      return (
        <ButtonRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "card":
      return (
        <CardRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "text":
      return (
        <TextRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "image":
      return (
        <ImageRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "form":
      return (
        <FormRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "nav":
      return (
        <NavRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );
    case "section":
      return (
        <SectionRenderer
          component={component}
          selected={selected}
          onSelect={onSelect}
        />
      );

    default:
      return null;
  }
}
