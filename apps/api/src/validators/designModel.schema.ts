import { z } from "zod";

export const AnimationSchema = z.object({
  type: z.enum(["fade", "slide", "scale", "bounce", "none"]),
  duration: z.number(),
  delay: z.number().optional(),
});

export const ThemeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
  borderRadius: z.string(),
  fontFamily: z.string(),
});

export const DesignComponentSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),

    type: z.enum([
      "section",
      "card",
      "button",
      "nav",
      "hero",
      "form",
      "text",
      "image",
    ]),

    content: z.string().optional(),

    styles: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
      .optional(),

    children: z.array(DesignComponentSchema).optional(),

    animation: AnimationSchema.optional(),
  })
);

export const DesignModelSchema = z.object({
  name: z.string(),

  theme: ThemeSchema,

  components: z.array(DesignComponentSchema),
});
