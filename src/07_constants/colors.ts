import Phaser from "phaser";

const COLOR_PALETTE = [
  0xff6b6b, // 밝은 레드
  0x6bcff6, // 스카이블루
  0x6ef3a3, // 민트그린
  0xf9ca24, // 샛노랑
  0xa29bfe, // 라벤더 퍼플
  0xfd79a8, // 핑크
];

export function getRandomColor(): number {
  return Phaser.Utils.Array.GetRandom(COLOR_PALETTE);
}

export function getDistinctColorPair(): { left: number; right: number } {
  let left = getRandomColor();
  let right = getRandomColor();

  while (left === right) {
    right = getRandomColor();
  }

  return { left, right };
}

export const COLORS = {
  background: "#222222",
  primary: "#4f46e5",
  accent: "#22d3ee",
  danger: "#ef4444",
  text: "#ffffff",
  buttonText: "#ffffff",
  buttonBg: "#4f46e5",
};
