import "./styles.css"; // CSS도 모듈처럼 가져옴

export function createStartUI(onStart: () => void) {
  const container = document.getElementById("app")!;

  const ui = document.createElement("div");
  ui.id = "start-ui";
  ui.innerHTML = `
    <h1>Slide Circle</h1>
    <button id="start-button">게임 시작</button>
  `;
  container.appendChild(ui);

  // 이벤트 연결
  document.getElementById("start-button")?.addEventListener("click", () => {
    ui.remove();
    onStart();
  });
}
