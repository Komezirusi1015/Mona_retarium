import { createObjects } from "./config/objects.js";
import { animate } from "./scripts/animate.js";
import { setupCustomCursor } from "./scripts/cursor.js";
import { startBlinking } from "./scripts/blink.js";

setupCustomCursor();

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

const objects = createObjects(centerX, centerY);

function updateTargets(clientX, clientY) {
  for (const obj of objects) {
    const refCenterX = centerX + obj.offsetX;
    const refCenterY = centerY + obj.offsetY;
    let dx = clientX - refCenterX;
    let dy = clientY - refCenterY;
    // fleeの場合は向きを反転（逃げる）
    if (obj.behavior === "flee") {
      dx *= -1;
      dy *= -1;
    }
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= obj.maxRadius) {
      obj.targetX = clientX;
      obj.targetY = clientY;
    } else {
      const ratio = obj.maxRadius / dist;
      obj.targetX = refCenterX + dx * ratio;
      obj.targetY = refCenterY + dy * ratio;
    }
  }
}

document.addEventListener("mousemove", (e) => {
  updateTargets(e.clientX, e.clientY);
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateTargets(touch.clientX, touch.clientY);
    }
  },
  { passive: true }
);

// 頭をなでると目が変化
const hotSpot = document.getElementById("hot_spot");
const eye = document.getElementById("eye");
const eyeback = document.getElementById("eye-back");
const eyelid = document.getElementById("eyelid");
const eyelid2 = document.getElementById("eyelid-2");
const undereye = document.getElementById("under-eye");
const mouth = document.getElementById("mouth");
let isDragging = false;
let dragStarted = false;

hotSpot.addEventListener("mousedown", () => {
  isDragging = true;
  dragStarted = false;
  hotSpot.classList.add("dragging");
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    dragStarted = false;
    hotSpot.classList.remove("dragging");
    // eye画像を元に戻す
    eye.src = "images/eye.png";
    mouth.src = "images/mouth.png";
    eyeback.style.display = "block";
    eyelid.style.display = "block";
    eyelid2.style.display = "block";
    undereye.style.display = "block";
  }
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    if (!dragStarted) {
      dragStarted = true;
      // eye画像をドラッグ用に切替え
      eye.src = "images/smile_eye.png"; // 変更したい画像パス
      mouth.src = "images/smile_mouth.png";
    eyeback.style.display = "none";
    eyelid.style.display = "none";
    eyelid2.style.display = "none";
    undereye.style.display = "none";
    }
    // 必要ならドラッグ中の動作追加
  }
});

// スマホ用（なで始め）
hotSpot.addEventListener(
  "touchstart",
  () => {
    isDragging = true;
    dragStarted = false;
    hotSpot.classList.add("dragging");
  },
  { passive: true }
);

// スマホ用（なで続ける）
window.addEventListener(
  "touchmove",
  (e) => {
    if (isDragging && !dragStarted) {
      dragStarted = true;
      eye.src = "images/smile_eye.png";
      mouth.src = "images/smile_mouth.png";
    eyeback.style.display = "none";
    eyelid.style.display = "none";
    eyelid2.style.display = "none";
    undereye.style.display = "none";
    }
  },
  { passive: true }
);

// スマホ用（離したとき）
window.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    dragStarted = false;
    hotSpot.classList.remove("dragging");
    eye.src = "images/eye.png";
    mouth.src = "images/mouth.png";
    eyeback.style.display = "block";
    eyelid.style.display = "block";
    eyelid2.style.display = "block";
    undereye.style.display = "block";
  }
});

window.addEventListener("touchcancel", () => {
  if (isDragging) {
    isDragging = false;
    dragStarted = false;
    hotSpot.classList.remove("dragging");
    eye.src = "images/eye.png";
    mouth.src = "images/mouth.png";
    eyeback.style.display = "block";
    eyelid.style.display = "block";
    eyelid2.style.display = "block";
    undereye.style.display = "block";
  }
});

function resetPosition() {
  for (const obj of objects) {
    const baseX = centerX + obj.offsetX;
    const baseY = centerY + obj.offsetY;
    obj.x = baseX;
    obj.y = baseY;
    obj.targetX = baseX;
    obj.targetY = baseY;
    obj.el.style.left = `${baseX}px`;
    obj.el.style.top = `${baseY}px`;
  }
}

resetPosition();

window.addEventListener("resize", () => {
  centerX = window.innerWidth / 2;
  centerY = window.innerHeight / 2;
  resetPosition();
});

// 開始
animate(objects, centerX, centerY);

startBlinking(1000, 5000);