type SelectPart = Exclude<
  Extract<keyof typeof import("@connextable/ui"), `UISelect${string}`>,
  "UISelect"
>;

export const selectParts = {
  UISelectTrigger: "Soft 스타일을 켜고 끄면서 트리거 배경을 비교할 수 있습니다.",
  UISelectContent: "폭을 전환해 목록 내용에 맞춘 경우와 트리거에 맞춘 경우를 비교합니다.",
  UISelectItem: "‘상태’ 목록을 열어 옵션의 보조 설명을 확인합니다.",
  UISelectValue: "선택값과 안내 문구를 슬롯에서 바꿉니다.",
  UISelectPortal: "선택 목록을 바깥에 렌더링해 부모의 overflow 설정에 잘리지 않게 합니다.",
} satisfies Record<SelectPart, string>;
