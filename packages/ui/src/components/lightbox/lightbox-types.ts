interface LightboxItemBase {
  id: string;
  label: string;
  description?: string;
  thumbnail?: string;
}

export interface UILightboxImage extends LightboxItemBase {
  kind: "image";
  src: string;
  alt: string;
}

export interface UILightboxVideo extends LightboxItemBase {
  kind: "video";
  sources: readonly { src: string; type?: string }[];
  poster?: string;
  tracks?: readonly {
    src: string;
    srclang: string;
    label: string;
    kind?: "captions" | "subtitles" | "descriptions";
    default?: boolean;
  }[];
  muted?: boolean;
  loop?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
}

export type UILightboxItem = UILightboxImage | UILightboxVideo;
