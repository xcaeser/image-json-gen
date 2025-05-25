# image-json-gen

**image-json-gen** is a lightweight repository for defining and serializing structured image-generation prompts in TypeScript. Using a well-defined JSON schema and SuperJSON, it ensures consistent, reproducible prompts for AI-driven image generation tools.

## Features

- **Type-safe Prompt Interface**: Defines a comprehensive `ImageGenerationPrompt` interface covering scene, subjects, style, lighting, composition, camera settings, resolution, and more.
- **JSON Schema Integration**: Adheres to a published JSON schema (`image-generation.schema.json`), enabling validation and tooling support.
- **SuperJSON Serialization**: Uses [SuperJSON](https://github.com/blitz-js/superjson) to preserve advanced types and metadata when writing prompts to disk.
- **One-step Prompt Export**: Simple script to serialize your prompt and output a `prompt.json` file ready for consumption by AI studios or pipelines.

## Getting Started

### Prerequisites

- Bun

### Installation

```bash
git clone https://github.com/your-org/image-json-gen.git
cd image-json-gen
bun install
```

### Usage

1. \*\*Edit \*\***`src/index.ts`**

   - Update the `prompt` object to reflect your desired scene and settings.
   - Adjust fields like `scene`, `subjects`, `style`, `lighting`, `resolution`, etc.

2. \*\*Generate \*\***`prompt.json`**

   ```bash
   bun run src/index.ts   # or `npm run start` if configured
   ```

   This writes `prompt.json` in the project root, formatted and serialized via SuperJSON.

3. **Consume the Prompt**

   Import or load `prompt.json` in your AI pipeline or tool:

   ```js
   import prompt from "./prompt.json";
   // Send `prompt` to your image-generation service
   ```

## Schema Reference

The JSON output conforms to [image-generation.schema.json](https://raw.githubusercontent.com/xcaeser/generation-schemas/main/schemas/v1.0.0/image-generation.schema.json).

```json
{
  "$schema": "https://.../image-generation.schema.json",
  "scene": "...",
  "subjects": [...],
  // ... other prompt fields
}
```

## Customization

- **Model Identifier**: Specify `model_identifier` to target different AI backends.
- **Seeds & Guidance**: Control reproducibility with `seed`, `guidance_scale`, and `num_inference_steps`.
- **Negative Prompts**: Use `negative_prompt` to exclude unwanted artifacts.

## License

MIT © xcaeser
