import "./styles.css";

export function createResultUI(score: number, onRestart: () => void) {
  const container = document.getElementById("app")!;

  // 이전 UI가 남아 있다면 제거
  document.getElementById("result-ui")?.remove();

  const ui = document.createElement("div");
  ui.id = "result-ui";
  ui.className = "result-ui";
  ui.innerHTML = `
    <h2>게임 종료</h2>
    <p>점수: ${score}</p>
    <button id="restart-button">다시 시작</button>
  `;
  container.appendChild(ui);

  ui.querySelector("#restart-button")?.addEventListener("click", () => {
    ui.remove();
    onRestart();
  });
}
