export function createResultUI(score: number, onRestart: () => void) {
  const container = document.getElementById("ui-layer")!;

  document.getElementById("result-ui")?.remove();

  const ui = document.createElement("div");
  ui.id = "result-ui";
  ui.className = "result-ui";
  ui.innerHTML = `
    <div class="title-wrap">
      <div class="subtitle">게임 종료</div>
      <div class="title">${score}점</div>
    </div>
    <button id="restart-button">다시 시작</button>
  `;
  container.appendChild(ui);

  ui.querySelector("#restart-button")?.addEventListener("click", () => {
    ui.remove();
    onRestart();
  });
}
