import Phaser from 'phaser';

const COLOR_PALETTE = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

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
