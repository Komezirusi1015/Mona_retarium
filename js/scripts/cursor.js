export function setupCustomCursor() {
  const cursor = document.getElementById("custom-cursor");

  const updateCursor = (x, y) => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  // マウス移動
  document.addEventListener("mousemove", (e) => {
    updateCursor(e.clientX, e.clientY);
  });

  // タッチ移動
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      updateCursor(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // 押し込みのエフェクト
  const activate = () => cursor.classList.add("active");
  const deactivate = () => cursor.classList.remove("active");

  document.addEventListener("mousedown", activate);
  document.addEventListener("mouseup", deactivate);
  document.addEventListener("touchstart", activate, { passive: true });
  document.addEventListener("touchend", deactivate);
}