export function startBlinking(minInterval = 3000, maxInterval = 8000) {
  const eyelid = document.getElementById("eyelid");
  const eyelid2 = document.getElementById("eyelid-2");

  function blink() {
    // 現在位置を基準にして上下移動（まばたき）
    const originalY = parseFloat(eyelid.style.top);
    const originalY2 = parseFloat(eyelid2.style.top);

    eyelid.style.transition = "transform 0.1s ease";
    eyelid2.style.transition = "transform 0.1s ease";
    eyelid.style.transform = "translate(-50%, -50%) translateY(25px) scaleY(0.2)";
    eyelid2.style.transform = "translate(-50%, -50%) translateY(25px)";

    setTimeout(() => {
      eyelid.style.transform = "translate(-50%, -50%)";
      eyelid2.style.transform = "translate(-50%, -50%)";
    }, 100);

    // 次回のまばたきまでのランダム間隔
    const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
    setTimeout(blink, nextInterval);
  }

  blink(); // 最初の呼び出し
}