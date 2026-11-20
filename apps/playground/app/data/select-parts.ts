type SelectPart = Exclude<
  Extract<keyof typeof import("@connextable/ui"), `UISelect${string}`>,
  "UISelect"
>;

export const selectParts = {
  UISelectLabel: "‘표시 언어’ 라벨을 눌러 목록을 열고, 언어를 바꿔 미리보기를 확인하세요.",
  UISelectTrigger: "Soft 스타일을 켜고 끄면서 트리거 배경을 비교할 수 있습니다.",
  UISelectValue: "다른 주기를 선택하거나 선택을 지워 값 슬롯과 안내 문구를 비교해 보세요.",
  UISelectContent: "폭을 전환해 목록 내용에 맞춘 경우와 트리거에 맞춘 경우를 비교합니다.",
  UISelectItem: "‘상태’ 목록을 열어 옵션의 보조 설명을 확인합니다.",
} satisfies Record<SelectPart, string>;
