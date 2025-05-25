import SuperJSON from "superjson";
import { type ImageGenerationPrompt } from "./types";

const prompt: ImageGenerationPrompt = {
  scene: "A red smoothie on a premium kitchen countertop",
  background: {
    elements: [],
    depth_of_field: "anamorphic bokeh (oval-shaped)",
  },
  camera: {
    angle:
      "crane shot (camera moves vertically on a crane, implies changing perspective)",
    distance: "cutaway shot (briefly shows something other than main action)",
    focus: "follow focus (keeping a moving subject sharp)",
    lens_type: "prime lens (fixed focal length, often sharper)",
  },
  color_palette: ["white", "red", "black"],
  lighting: "candlelight (warm, flickering, intimate)",
  composition: "depth (foreground, middle ground, background layers)",
  mood: "cozy and comforting",
  props: ["none"],
  resolution: {
    width: "4096",
    height: "4320",
    aspect_ratio: "16:9",
    dpi: "300 (Standard Print)",
  },
  style: "HDR photography (high dynamic range)",
  subjects: [
    {
      description: "A red smoothie in a glass",
      expression: "happy",
      pose: "sitting",
      position: "middle-left midground",
      type: "glass with smoothie",
    },
  ],
  text_overlays: [
    {
      content: "A red smoothie on a premium kitchen countertop",
      position: "top-center edge",
      style: "bold",
      size: "large",
      font_color: "gold",
      font_family: "Futura Condensed Bold",
      opacity: 0.8,
      rotation: -15,
    },
  ],
  guidance_scale: 10,
};

const json = SuperJSON.stringify({
  $schema:
    "https://raw.githubusercontent.com/xcaeser/generation-schemas/main/schemas/v1.0.0/image-generation.schema.json",
  ...prompt,
});

await Bun.write(Bun.file("prompt.json"), json);
