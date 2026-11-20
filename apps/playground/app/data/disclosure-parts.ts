type DisclosurePart = Exclude<
  Extract<keyof typeof import("@connextable/ui"), `UIDisclosure${string}`>,
  "UIDisclosure"
>;

export const disclosureParts = {
  UIDisclosureTrigger: "버튼에 크기와 스타일을 지정합니다. 펼침 상태에 따라 화살표 방향이 바뀝니다.",
  UIDisclosureContent: "divided를 지정하면 펼친 콘텐츠 위에 구분선이 표시됩니다.",
} satisfies Record<DisclosurePart, string>;
