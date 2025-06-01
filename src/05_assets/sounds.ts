export const SOUND_KEYS = {
    CLICK: 'click',
    EXPLODE_SUCCESS: 'explode_success',
    EXPLODE_FAILURE: 'explode_failure',
};

export function preloadCommonSounds(scene: Phaser.Scene) {
    scene.load.audio(SOUND_KEYS.CLICK, 'assets/sounds/water-drip.mp3');
    scene.load.audio(SOUND_KEYS.EXPLODE_SUCCESS, 'assets/sounds/bubblepop.mp3');
    scene.load.audio(SOUND_KEYS.EXPLODE_FAILURE, 'assets/sounds/error.mp3');
}