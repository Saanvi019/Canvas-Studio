export interface AnimationDefinition {
  type: "fade" | "slide" | "scale" | "bounce" | "none";

  duration: number;

  delay?: number;
}

export interface ThemeTokens {
  primaryColor: string;

  secondaryColor: string;

  backgroundColor: string;

  textColor: string;

  borderRadius: string;

  fontFamily: string;
}

export interface DesignComponent {
  id: string;

  type:
    | "section"
    | "card"
    | "button"
    | "nav"
    | "hero"
    | "form"
    | "text"
    | "image";

  content?: string;

  styles?: Record<string, string>;

  children?: DesignComponent[];

  animation?: AnimationDefinition;
}

export interface DesignModel {
  name: string;

  theme: ThemeTokens;

  components: DesignComponent[];
}
