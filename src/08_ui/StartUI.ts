export function createStartUI(onStart: () => void) {
  const container = document.getElementById("ui-layer")!;

  document.getElementById("start-ui")?.remove();

  const ui = document.createElement("div");
  ui.id = "start-ui";
  ui.innerHTML = `
    <div class="title-wrap">
      <div class="subtitle">슬라이드</div>
      <div class="title">사과게임</div>
    </div>
    <button id="start-button">게임 시작</button>
  `;
  container.appendChild(ui);

  document.getElementById("start-button")?.addEventListener("click", () => {
    ui.remove();
    onStart();
  });
}
