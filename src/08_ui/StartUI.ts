export function createStartUI(onStart: () => void) {
  const container = document.getElementById("ui-layer")!;

  document.getElementById("start-ui")?.remove();

  const ui = document.createElement("div");
  ui.id = "start-ui";
  ui.innerHTML = `
    <h1>Slide Game</h1>
    <button id="start-button">게임 시작</button>
  `;
  container.appendChild(ui);

  document.getElementById("start-button")?.addEventListener("click", () => {
    ui.remove();
    onStart();
  });
}
