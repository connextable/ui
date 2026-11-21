import type { UILightboxImage, UILightboxItem, UILightboxVideo } from "@connextable/ui";

export const pinkFlower: UILightboxImage = {
  id: "pink-flower",
  kind: "image",
  label: "연분홍 꽃잎",
  description: "봄에 핀 꽃의 겹친 꽃잎을 가까이에서 촬영했습니다.",
  src: "/lightbox/pink-flower.jpg",
  alt: "넓고 연분홍빛을 띠는 꽃잎 여러 장이 겹쳐 있는 모습",
};

export const bees: UILightboxImage = {
  id: "bees",
  kind: "image",
  label: "꽃에 내려앉은 벌",
  description: "세로 사진입니다. 벌과 꽃잎이 잘리지 않도록 사진 전체를 표시합니다.",
  src: "/lightbox/bees.jpg",
  alt: "보랏빛 꽃 안쪽에 모인 벌",
};

export const flowering: UILightboxVideo = {
  id: "flowering",
  kind: "video",
  label: "꽃봉오리가 열리는 순간",
  description: "꽃이 피는 과정을 약 5초로 압축한 영상입니다.",
  poster: "/lightbox/flower-poster.jpg",
  sources: [{ src: "/lightbox-media/flower", type: "video/mp4" }],
};

export const purpleFlowers: UILightboxImage = {
  id: "purple-flowers",
  kind: "image",
  label: "보랏빛 꽃 무리",
  description: "여러 송이가 한데 모여 있는 모습입니다.",
  src: "/lightbox/purple-flowers.jpg",
  alt: "작은 보랏빛 꽃 여러 송이가 화면 안에 모여 있는 모습",
};

export const observationMedia: readonly UILightboxItem[] = [pinkFlower, flowering, bees, purpleFlowers];

export const bunnyExcerpt: UILightboxVideo = {
  id: "bunny",
  kind: "video",
  label: "빅 벅 버니 예고편",
  description: "© 2008 Blender Foundation / www.bigbuckbunny.org · CC BY 3.0 · 예고편 일부",
  poster: "/lightbox/bunny-poster.jpg",
  sources: [{ src: "/lightbox-media/bunny-excerpt", type: "video/mp4" }],
  tracks: [{ src: "/lightbox/bunny.ko.vtt", srclang: "ko", label: "한국어" }],
  muted: true,
  loop: true,
};
