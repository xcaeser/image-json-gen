/**
 * @title Image Generation Prompt Schema for AI Studio
 * @description This schema defines a structured way to describe a visual scene for generative AI models.
 * Providing detailed, well-organized prompts helps the AI understand your intent more accurately,
 * leading to higher quality and more specific image outputs. Use this schema to guide your
 * AI Studio prompt creation for optimal results. Each field contributes to a different aspect
 * of the final image, from the overall concept to minute details.
 */
export interface ImageGenerationPrompt {
  /**
   * A concise, high-level summary of the entire visual scene. This sets the overall stage.
   * Think of it as the 'elevator pitch' for your image. Be descriptive but brief.
   * @example "A lone astronaut discovering an ancient alien artifact on a desolate Mars landscape."
   * @example "A bustling medieval marketplace filled with merchants, shoppers, and street performers."
   */
  scene: string;

  /**
   * Defines the main characters, creatures, or animate objects that are the focus of the scene.
   * At least one subject is required. For inanimate focal points (e.g., a magical sword),
   * consider if it's a 'prop' or if its significance elevates it to a 'subject'.
   */
  subjects: Subject[];

  /**
   * The overall artistic or visual style of the image. Select a predefined style or provide a custom description.
   * This is a powerful field that dramatically influences the look and feel.
   */
  style: StyleOption | (string & {}); // `(string & {})` allows any string for custom values

  /**
   * Describes the lighting conditions, light sources, and their effect on the scene.
   * Choose a common lighting setup or describe a custom one. Lighting is key to mood and realism.
   */
  lighting: LightingOption | (string & {});

  /**
   * The dominant emotional atmosphere or feeling the image should evoke. Select a mood or describe a custom one.
   * This often works in conjunction with lighting and color palette.
   */
  mood: MoodOption | (string & {});

  /**
   * Details about the environment or setting behind the main subjects.
   * This provides context and depth to the scene.
   */
  background: Background;

  /**
   * The arrangement of visual elements within the frame.
   * Choose a known compositional rule or describe your desired layout.
   */
  composition: CompositionOption | (string & {});

  /**
   * Specifies the virtual camera's viewpoint, framing, lens, and focus,
   * as if you were a photographer or cinematographer.
   */
  camera: Camera;

  /**
   * A list of dominant or significant colors to be used in the scene.
   * This can also describe a color scheme or temperature.
   * @example ["monochromatic blues and grays"]
   * @example ["warm earth tones: terracotta, ochre, forest green"]
   * @example ["vibrant neon pinks, cyans, and electric yellows"]
   */
  color_palette: string[];

  /**
   * Specific, usually inanimate, items or objects present in the scene
   * that subjects might interact with or that add detail/context.
   * Differentiate from 'background elements' by their potential for interaction or closer focus.
   * @example ["a steaming cup of coffee on a wooden table"]
   * @example ["an ancient, glowing sword embedded in a stone"]
   */
  props?: string[];

  /**
   * Defines the desired output image dimensions, aspect ratio, and DPI.
   * Providing explicit values ensures the AI generates an image with the intended proportions and quality.
   */
  resolution: Resolution;

  /**
   * (Optional) Text elements to be rendered onto the image.
   * Useful for titles, watermarks, or in-scene text like signs.
   * AI generation of coherent text can be challenging, so keep it simple or use for stylistic effect.
   */
  text_overlays?: TextOverlay[];

  /**
   * (Optional) A list of concepts, objects, styles, or attributes to *avoid* in the generated image.
   * Helps refine the output by specifying what *not* to include.
   * @example ["text", "watermarks", "ugly", "deformed hands", "blurry", "low quality"]
   */
  negative_prompt?: string | string[];

  /**
   * (Optional) A specific seed value for the random number generator.
   * Using the same seed with the same prompt will ideally produce very similar or identical images, aiding reproducibility.
   * @example 42
   * @example 1234567890
   */
  seed?: number;

  /**
   * (Optional) Controls how strictly the AI should adhere to the prompt.
   * Higher values mean stricter adherence, lower values allow more creativity. Typical range: 1-20, common default around 7-11.
   * @example 7.5
   */
  guidance_scale?: number;

  /**
   * (Optional) The number of denoising steps for the generation process.
   * More steps can lead to higher quality/detail but take longer. Typical range: 20-100.
   * @example 50
   */
  num_inference_steps?: number;

  /**
   * (Optional) Specifies which AI generation model to use if multiple are available.
   * @example "stable-diffusion-xl-base-1.0"
   * @example "dall-e-3-hd"
   */
  model_identifier?: string;
}

// --- Subject Definition ---
export interface Subject {
  /**
   * The general category or archetype of the subject.
   * This helps the AI understand the subject's fundamental nature.
   * @example "young woman"
   * @example "elderly wizard"
   * @example "cybernetic wolf"
   */
  type: string;

  /**
   * Detailed visual characteristics of the subject, including physical features, attire, and any distinguishing marks.
   * The more specific you are, the closer the AI can get to your vision.
   * @example "A 20-year-old woman with fiery red hair in a messy bun, freckles, wearing a leather jacket, ripped jeans, and combat boots."
   */
  description: string;

  /**
   * The subject's body language or action. This conveys activity and intent.
   * @example "standing confidently with arms crossed"
   * @example "crouching low, ready to pounce"
   */
  pose: string;

  /**
   * The subject's placement within the visual frame.
   * This helps establish their relationship to other elements and the viewer.
   * @example "center frame, dominant"
   * @example "foreground left, slightly out of focus"
   */
  position: SubjectPositionOption | (string & {});

  /**
   * The facial expression or emotional state conveyed by the subject. Crucial for storytelling and mood.
   * @example "smiling warmly and invitingly"
   * @example "a look of fierce determination"
   */
  expression: string;

  /**
   * (Optional) Specific accessories, jewelry, or distinct clothing items that need emphasis.
   * @example ["silver locket necklace", "worn leather satchel", "glowing arcane bracers"]
   */
  accessories?: string[];
}

// --- Enum-like Union Types ---

export type StyleOption =
  // --- Photography Styles ---
  | "photorealistic, cinematic"
  | "documentary photography"
  | "street photography (e.g., Henri Cartier-Bresson style)"
  | "fashion photography (e.g., Vogue, editorial)"
  | "portrait photography (e.g., headshot, environmental)"
  | "landscape photography (e.g., Ansel Adams style, epic vista)"
  | "architectural photography (interior/exterior)"
  | "fine art photography"
  | "black and white photography (monochrome, high contrast B&W)"
  | "sepia tone photography"
  | "HDR photography (high dynamic range)"
  | "macro photography (extreme close-up)"
  | "wildlife photography"
  | "sports photography (action shot)"
  | "product photography (studio lit, clean background)"
  | "food photography (appetizing, top-down)"
  | "astrophotography (stars, nebulae)"
  | "aerial photography (drone shot)"
  | "underwater photography"
  | "lomography / lomo effect"
  | "Polaroid / instant film style"
  | "vintage photography (e.g., daguerreotype, tintype)"
  | "double exposure"
  | "long exposure photography (light trails, blurred water)"
  // --- Painting & Illustration Styles ---
  | "impressionistic oil painting (e.g., Monet, Renoir)"
  | "expressionistic painting (e.g., Munch, Kirchner)"
  | "surrealism (e.g., Dali, Magritte)"
  | "abstract art (e.g., Kandinsky, Pollock)"
  | "cubism (e.g., Picasso, Braque)"
  | "pop art (e.g., Warhol, Lichtenstein)"
  | "renaissance painting (e.g., da Vinci, Michelangelo)"
  | "baroque painting (e.g., Rembrandt, Caravaggio)"
  | "romanticism painting (e.g., Turner, Friedrich)"
  | "watercolor painting (soft, blended)"
  | "gouache illustration"
  | "charcoal sketch (textured, smudged)"
  | "pencil drawing (graphite, detailed)"
  | "ink drawing (pen and ink, stippling, cross-hatching)"
  | "comic book art (e.g., Marvel, DC style, dynamic panels)"
  | "graphic novel style (cinematic illustration)"
  | "concept art (for games/film, detailed environment/character)"
  | "children's book illustration (whimsical, colorful)"
  | "storybook illustration"
  | "technical illustration (precise, diagrammatic)"
  | "instructional diagram"
  | "ukiyo-e (Japanese woodblock print)"
  // --- Digital & 3D Styles ---
  | "anime concept art (e.g., Makoto Shinkai, Studio Ghibli)"
  | "manga style (black and white, screentones)"
  | "steampunk digital illustration"
  | "cyberpunk aesthetic (neon, futuristic)"
  | "vaporwave aesthetic"
  | "synthwave aesthetic"
  | "low poly 3D render"
  | "high poly 3D render (detailed mesh)"
  | "cel-shaded 3D (toon shading)"
  | "photorealistic 3D render (Unreal Engine, Octane render)"
  | "voxel art"
  | "pixel art (e.g., 8-bit, 16-bit, isometric)"
  | "glitch art"
  // --- Design & Other Styles ---
  | "Art Nouveau poster design (e.g., Mucha)"
  | "Art Deco design (geometric, luxurious)"
  | "Bauhaus design (minimalist, functional)"
  | "Swiss Design / International Typographic Style"
  | "vector art (clean lines, flat colors)"
  | "minimalist design"
  | "grunge aesthetic"
  | "collage art"
  | "graffiti art"
  | "silhouette art"
  | "stained glass window style"
  | "mosaic art"
  | "blueprint drawing style"
  | "thermal imaging style"
  | "x-ray style"
  | "infrared photography style"
  | "cinematic still (from a film)"
  | "film noir style (high contrast, shadows)"
  | "sci-fi concept art (e.g., Syd Mead style)"
  | "fantasy art (e.g., Frank Frazetta style)"
  | "style of [Specific Artist Name, e.g., Van Gogh, H.R. Giger]";

export type LightingOption =
  // --- Natural Light & Time of Day ---
  | "golden hour (sunrise/sunset, soft warm light, long shadows)"
  | "blue hour (twilight, cool deep blue tones)"
  | "high noon (harsh overhead sun, strong shadows)"
  | "overcast day (diffused, even, soft shadows)"
  | "dappled sunlight (through leaves/trees)"
  | "moonlit night (cool blue, subtle highlights, deep shadows)"
  | "starlight (very low light, long exposure needed for stars)"
  | "aurora borealis / australis (northern/southern lights)"
  // --- Artificial & Studio Light ---
  | "studio lighting (controlled, versatile)"
  | "three-point lighting (key, fill, backlight)"
  | "Rembrandt lighting (triangular light on cheek)"
  | "split lighting (half face lit, half shadow)"
  | "butterfly lighting (Paramount, shadow under nose)"
  | "loop lighting (small loop shadow from nose)"
  | "broad lighting (main light on side of face towards camera)"
  | "short lighting (main light on side of face away from camera)"
  | "rim lighting / kicker (outlines subject from behind)"
  | "hair light (separates subject from background)"
  | "softbox lighting (large, diffused, soft shadows)"
  | "hard light (direct sun, spotlight, crisp shadows)"
  | "ring light (even, often for portraits/vlogging)"
  | "fluorescent lighting (cool, greenish tint typical)"
  | "incandescent / tungsten lighting (warm, orange tint)"
  | "LED panel lighting (versatile, dimmable, color temp adjustable)"
  | "neon city lights (vibrant, colorful reflections, cyberpunk)"
  | "candlelight (warm, flickering, intimate)"
  | "firelight (warm, dynamic shadows)"
  | "spotlight (focused beam, dramatic emphasis)"
  | "lantern light"
  | "halogen lamp"
  | "blacklight / UV light"
  // --- Light Qualities & Effects ---
  | "dramatic chiaroscuro (strong contrast, deep shadows)"
  | "backlit (subject in silhouette or with glowing edges)"
  | "contre-jour (shooting against the light source)"
  | "silhouette lighting"
  | "volumetric lighting / god rays (visible beams of light)"
  | "lens flare (anamorphic, spherical)"
  | "eerie bioluminescent glow (from flora/fauna)"
  | "underwater caustics (light patterns through water)"
  | "foggy / misty diffused light (atmospheric perspective)"
  | "low-key lighting (dark tones dominate, high contrast)"
  | "high-key lighting (bright tones dominate, low contrast)"
  | "gel lighting (colored gels on lights for artistic effect)"
  | "projected light patterns (gobos)"
  | "light painting (long exposure with moving light source)";

export type MoodOption =
  // --- Core Emotions ---
  | "serene and peaceful"
  | "joyful and vibrant"
  | "sad and melancholic"
  | "angry and intense"
  | "fearful and suspenseful"
  | "surprised and awe-struck"
  // --- Atmospheric & Tonal ---
  | "dark and ominous"
  | "mysterious and enchanting"
  | "nostalgic and wistful"
  | "epic and awe-inspiring"
  | "whimsical and playful"
  | "romantic and intimate"
  | "tense and dramatic"
  | "eerie and unsettling"
  | "hopeful and uplifting"
  | "lonely and desolate"
  | "powerful and commanding"
  | "dreamlike and surreal"
  | "chaotic and frenetic"
  | "calm and tranquil"
  | "cozy and comforting"
  | "cold and isolating"
  | "warm and inviting"
  | "opulent and luxurious"
  | "gritty and raw"
  | "sterile and clinical"
  | "sacred and reverent"
  | "absurd and comical"
  // --- Genre-Specific ---
  | "horror / terrifying"
  | "thriller / suspenseful"
  | "comedy / lighthearted"
  | "sci-fi / futuristic"
  | "fantasy / magical"
  | "film noir / brooding";

export type DepthOfFieldOption =
  // --- General DoF ---
  | "shallow (blurred background, subject sharp, f/1.2-f/2.8)"
  | "medium (some background separation, f/4-f/8)"
  | "deep (most of scene in focus, f/11-f/22+)"
  | "everything tack sharp (infinite DoF illusion)"
  // --- Bokeh Quality & Style ---
  | "strong bokeh (background heavily blurred, creamy)"
  | "creamy bokeh (smooth, non-distracting blur)"
  | "busy bokeh (distracting, harsh highlights in blur)"
  | "swirly bokeh (vintage lens effect, Petzval)"
  | "soap bubble bokeh (defined edges on highlights)"
  | "anamorphic bokeh (oval-shaped)"
  | "bokeh balls (distinct circular highlights)"
  // --- Specific Techniques & Effects ---
  | "extreme shallow DoF (subject isolated, paper-thin focus plane)"
  | "foreground blurred, subject sharp, background blurred (sandwich)"
  | "subject sharp, foreground blurred, background sharp (deep focus with foreground element)"
  | "tilt-shift effect (miniature faking, selective focus plane)"
  | "Lensbaby effect (sweet spot of focus, surrounding blur)"
  | "motion blur in background (subject sharp, panning effect)"
  | "soft focus filter effect (dreamy, glowing highlights)";

export type CompositionOption =
  // --- Classic Rules ---
  | "rule of thirds (intersections or lines)"
  | "golden ratio (phi grid, spiral)"
  | "Fibonacci spiral"
  | "rule of odds (odd number of subjects)"
  // --- Lines & Shapes ---
  | "leading lines (guiding eye to subject)"
  | "diagonal lines (dynamic, energy)"
  | "horizontal lines (calm, stability)"
  | "vertical lines (strength, height)"
  | "curved lines / S-curve (flow, elegance)"
  | "triangles (stable or dynamic)"
  | "circles / radial balance"
  // --- Framing & Space ---
  | "symmetrical balance (formal, mirrored)"
  | "asymmetrical balance (informal, visual weight distributed)"
  | "centered subject (strong focal point, minimalist)"
  | "frame within a frame (using elements to frame subject)"
  | "negative space (empty areas emphasizing subject)"
  | "fill the frame (subject dominates, no distractions)"
  | "leading room / nose room (space in direction of gaze/movement)"
  | "head room (space above subject's head)"
  // --- Advanced & Dynamic ---
  | "dynamic symmetry (armature grids)"
  | "pattern and repetition (rhythm, texture)"
  | "breaking patterns (emphasis on the anomaly)"
  | "juxtaposition (contrasting elements)"
  | "visual weight and balance"
  | "viewpoint / perspective (low, high, unusual)"
  | "depth (foreground, middle ground, background layers)"
  | "figure-ground relationship (subject distinct from background)";

export type CameraAngleOption =
  // --- Basic Angles ---
  | "eye-level shot (neutral, relatable)"
  | "low-angle shot (subject appears powerful, heroic)"
  | "high-angle shot (subject appears small, vulnerable)"
  // --- Extreme & Specialty Angles ---
  | "bird's-eye view (directly overhead, map-like)"
  | "worm's-eye view (directly from below, imposing)"
  | "Dutch angle / canted angle (tilted, conveys unease/dynamism)"
  // --- Subject-Relative Angles ---
  | "frontal shot (direct, confrontational)"
  | "profile shot (side view, emphasizes silhouette)"
  | "three-quarter view (common for portraits, shows dimension)"
  | "over-the-shoulder shot (OTS, connects characters)"
  | "point of view (POV, sees through subject's eyes)"
  | "reverse angle shot (shows opposite perspective)"
  // --- Other ---
  | "canted frame (slight tilt)"
  | "ground-level shot (camera very low to the ground)"
  | "crane shot (camera moves vertically on a crane, implies changing perspective)";

export type CameraDistanceOption =
  // --- Close-Ups ---
  | "extreme close-up (ECU) (e.g., eyes, mouth, small detail)"
  | "tight close-up (TCU) (just the face)"
  | "close-up (CU) (head and shoulders)"
  | "medium close-up (MCU) (chest up)"
  // --- Medium Shots ---
  | "medium shot (MS) (waist up, shows some environment)"
  | "medium full shot / cowboy shot (MLS) (mid-thigh or knees up)"
  // --- Long/Full Shots ---
  | "full shot (FS) (entire body from head to toe)"
  | "long shot (LS) (subject visible, but environment dominates)"
  | "wide shot (WS) (similar to LS, emphasizes breadth)"
  | "extreme long shot (ELS) (subject tiny, vast landscape, establishing)"
  // --- Specialty Shots ---
  | "establishing shot (opens a scene, shows location)"
  | "master shot (covers all action in a scene from one angle)"
  | "two-shot (frames two subjects)"
  | "group shot (frames three or more subjects)"
  | "insert shot (close-up of an object or detail relevant to the scene)"
  | "cutaway shot (briefly shows something other than main action)";

export type CameraLensOption =
  | "standard lens (e.g., 35-50mm equivalent, natural perspective)"
  | "wide-angle lens (e.g., 16-35mm, expansive view, potential distortion)"
  | "ultra-wide-angle lens (e.g., <16mm, extreme field of view)"
  | "telephoto lens (e.g., 70-200mm, compresses perspective, isolates subject)"
  | "super-telephoto lens (e.g., 300mm+, extreme compression/magnification)"
  | "fisheye lens (extreme distortion, circular or very wide view)"
  | "macro lens (for extreme close-ups of small details)"
  | "prime lens (fixed focal length, often sharper)"
  | "zoom lens (variable focal length)"
  | "tilt-shift lens (selective focus plane, miniature effect)";

export type CameraFocusOption =
  // --- Sharpness & Clarity ---
  | "pin-sharp focus on primary subject"
  | "tack-sharp eyes, face slightly softer"
  | "everything in sharp focus (deep focus, f/16+)"
  // --- Selective Focus & Blur ---
  | "selective focus (isolating subject from background/foreground)"
  | "shallow depth of field, sharp subject, blurred background"
  | "soft focus overall (dreamy, ethereal, vintage look)"
  | "out-of-focus foreground elements (framing, depth)"
  | "bokehlicious (prominent, aesthetically pleasing bokeh)"
  | "background completely obliterated (extreme shallow DoF)"
  // --- Dynamic & Artistic Focus ---
  | "rack focus / focus pull (shifting focus between planes)"
  | "follow focus (keeping a moving subject sharp)"
  | "zone focusing (pre-focusing for street photography)"
  | "manual focus aesthetic (implies careful control)"
  | "split diopter effect (two planes of focus sharp)"
  | "Lensbaby selective focus (sweet spot of sharp, artistic blur)"
  | "intentional motion blur on subject (conveys movement)"
  | "everything intentionally out of focus (abstract, impressionistic)";

export type AspectRatioOption =
  // --- Common Square & Portrait ---
  | "1:1 (Square)"
  | "9:16 (Portrait Widescreen - Stories, TikTok)"
  | "4:5 (Portrait - Instagram Feed)"
  | "3:4 (Portrait Standard)"
  | "2:3 (Portrait Photography - DSLR/Mirrorless)"
  | "5:7 (Portrait Photo Print)"
  // --- Common Landscape ---
  | "16:9 (Landscape Widescreen - HD/4K Video, YouTube)"
  | "3:2 (Landscape Photography - DSLR/Mirrorless)"
  | "4:3 (Landscape Standard - Older TV, iPad)"
  | "5:4 (Landscape - Large Format Photography)"
  | "7:5 (Landscape Photo Print)"
  // --- Cinematic & Ultrawide ---
  | "1.85:1 (Cinematic Widescreen - Academy Flat)"
  | "2:1 (Univisium, some smartphones)"
  | "2.35:1 (Cinematic Anamorphic Widescreen - older standard)"
  | "2.39:1 / 2.40:1 (Cinematic Anamorphic Widescreen - current standard)"
  | "21:9 (Ultrawide Monitor / Marketing term for ~2.3x:1)"
  | "32:9 (Super Ultrawide Monitor)"
  // --- Panoramic ---
  | "2:1 Panoramic"
  | "3:1 Panoramic"
  | "XPan (65:24 or ~2.7:1, Hasselblad XPan camera)"
  // --- Classic & Other ---
  | "Golden Ratio (~1.618:1)";

export type SubjectPositionOption =
  | "center frame"
  | "center foreground"
  | "center midground"
  | "center background"
  | "top-left foreground"
  | "top-center foreground"
  | "top-right foreground"
  | "middle-left foreground"
  | "middle-right foreground"
  | "bottom-left foreground"
  | "bottom-center foreground"
  | "bottom-right foreground"
  | "top-left midground"
  | "top-center midground"
  | "top-right midground"
  | "middle-left midground"
  | "middle-right midground"
  | "bottom-left midground"
  | "bottom-center midground"
  | "bottom-right midground"
  | "top-left background"
  | "top-center background"
  | "top-right background"
  | "middle-left background"
  | "middle-right background"
  | "bottom-left background"
  | "bottom-center background"
  | "bottom-right background"
  | "dominant in frame"
  | "partially off-screen left"
  | "partially off-screen right"
  | "slightly off-center"
  | "filling the frame";

export type EnvironmentTypeOption =
  | "interior - domestic (room, house)"
  | "interior - public (office, mall, station, museum)"
  | "interior - industrial (factory, warehouse, lab)"
  | "interior - fantastical (cave, dungeon, spaceship bridge, alien structure)"
  | "exterior - urban (city street, skyscraper rooftop, alleyway, park)"
  | "exterior - suburban (residential street, backyard)"
  | "exterior - rural (farmland, countryside, village)"
  | "exterior - nature (forest, mountain, beach, desert, jungle, plains, tundra)"
  | "exterior - fantastical (alien planet, dreamscape, floating islands, underworld)"
  | "studio backdrop (plain color, textured, greenscreen, cyclorama)"
  | "sky / space (clouds, stars, nebula, galaxy)"
  | "underwater (ocean floor, coral reef, open water)";

export type WidthOption =
  | "512"
  | "768"
  | "1024"
  | "1280"
  | "1344"
  | "1536"
  | "1920"
  | "2048"
  | "2560"
  | "3840"
  | "4096"
  | "7680";

export type HeightOption =
  | "512"
  | "768"
  | "1024"
  | "1080"
  | "1200"
  | "1344"
  | "1440"
  | "1536"
  | "1920"
  | "2160"
  | "4096"
  | "4320";

export type DpiOption =
  | "72 (Web/Screen)"
  | "96 (Windows Default)"
  | "150 (Draft Print)"
  | "300 (Standard Print)"
  | "600 (High-Res Print)";

export type TextPositionOption =
  // --- Corners ---
  | "top-left corner"
  | "top-right corner"
  | "bottom-left corner"
  | "bottom-right corner"
  // --- Edges Centered ---
  | "top-center edge"
  | "bottom-center edge"
  | "left-center edge"
  | "right-center edge"
  // --- Overall Centered ---
  | "center of image"
  // --- Banners / Strips ---
  | "top-banner (strip across the top)"
  | "bottom-banner (strip across the bottom)"
  | "left-sidebar (strip down the left)"
  | "right-sidebar (strip down the right)"
  // --- Relative Positions (often need further description for exact placement) ---
  | "slightly above center"
  | "slightly below center"
  | "offset from top-left"
  | "within rule-of-thirds top-left intersection"
  | "aligned with subject's eyeline";

// --- Complex Property Types ---

export interface Background {
  /**
   * The general category of the background environment.
   * @example "urban cityscape"
   * @example "dense forest interior"
   */
  environment_type?: EnvironmentTypeOption | (string & {});

  /**
   * A list of key features, objects, or environmental details visible in the background.
   * Don't over-clutter; focus on what's important for context.
   * @example ["towering snow-capped mountains", "a distant, crumbling castle"]
   */
  elements: string[];

  /**
   * How focus is handled for the background, affecting its clarity relative to the subjects.
   * Choose a preset or describe a custom effect.
   */
  depth_of_field: DepthOfFieldOption | (string & {});
}

export interface Camera {
  /**
   * The angle from which the scene is viewed.
   * Choose a standard angle or describe a custom one.
   */
  angle: CameraAngleOption | (string & {});

  /**
   * How close or far the camera is from the primary subjects.
   * Choose a standard shot distance or describe a custom one.
   */
  distance: CameraDistanceOption | (string & {});

  /**
   * (Optional) Specifies the type of virtual camera lens, which affects field of view and distortion.
   * @example "wide-angle lens (e.g., 24mm)"
   */
  lens_type?: CameraLensOption | (string & {});

  /**
   * Specifies the main point of focus in the image.
   * Choose a common focus technique or describe a custom one.
   */
  focus: CameraFocusOption | (string & {});
}

export interface Resolution {
  /**
   * The desired width of the output image in pixels. Can be one of the predefined string values or any number.
   * If a string is provided, it should be parsed to a number.
   * @example "1920"
   * @example 1024
   */
  width: WidthOption | number;

  /**
   * The desired height of the output image in pixels. Can be one of the predefined string values or any number.
   * If a string is provided, it should be parsed to a number.
   * @example "1080"
   * @example 1024
   */
  height: HeightOption | number;

  /**
   * The proportional relationship between the image's width and height.
   * Choose a standard ratio or specify a custom one (e.g., "5:4").
   * Ensure it aligns with width/height if providing a custom string.
   */
  aspect_ratio: AspectRatioOption | (string & { pattern?: "^\\d+:\\d+$" });

  /**
   * Dots Per Inch. Specifies the print resolution of the image. Can be one of the predefined string values or any number.
   * If a string is provided, the numeric part should be parsed.
   * Common values are 72 (web), 150 (draft print), 300 (high-quality print).
   * @example "72 (Web/Screen)"
   * @example 300
   */
  dpi: DpiOption | number;

  /**
   * (Optional) A human-readable label for the resolution and aspect ratio combination.
   * This is for convenience and documentation, not typically parsed by the AI.
   * @example "Full HD Landscape"
   * @example "Square HD for Social Media"
   */
  label?: string;
}

export interface TextOverlay {
  /**
   * The actual text string to display.
   * @example "The Lost City"
   * @example "© AI Studio 2024"
   */
  content: string;

  /**
   * Where the text should be placed on the image.
   * Choose a common position or describe a custom one.
   */
  position: TextPositionOption | (string & {});

  /**
   * Describes the font, color, and style of the text. AI might interpret this broadly.
   * @example "bold white sans-serif font"
   * @example "elegant gold script font"
   */
  style: string;

  /**
   * Desired font family (e.g., 'Arial', 'Times New Roman', 'Impact'). AI interpretation may vary.
   * @example "Futura Condensed Bold"
   */
  font_family: string;

  /**
   * Color of the text (e.g., 'white', '#FF0000', 'rgb(255,0,0)').
   * @example "gold"
   * @example "#00FFFF"
   */
  font_color: string;

  /**
   * Relative or absolute size of the text. AI interpretation may vary.
   * @example "large and prominent"
   * @example "small and subtle (like a watermark)"
   * @example "10% of image height" // AI might interpret this abstractly
   * @example "24pt" // AI might interpret this abstractly
   */
  size: string;

  /**
   * Opacity of the text, from 0.0 (fully transparent) to 1.0 (fully opaque).
   * @example 0.8
   */
  opacity: number;

  /**
   * (Optional) Rotation of the text in degrees.
   * @example -15 (for a slight tilt)
   * @example 90 (vertical text)
   */
  rotation?: number;
}
