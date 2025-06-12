export function animate(objects, centerX, centerY) {
    const background = objects[0];
    const backHear = objects[1]; // （後ろ髪）
    const face = objects[2]; // （顔）
    const frontHear2 = objects[3]; // （前髪２）
    const frontHear1 = objects[4]; // （前髪１）
    const mouth = objects[5]; // （口）
    const eyeback = objects[6]; // （瞳）
    const eye = objects[7]; // （目）
    const underEye = objects[8]; // （涙袋）
    const eyelid2 = objects[9]; // （瞼）
    const eyelid = objects[10]; // （瞼）
    const eyebrow = objects[11]; //（眉）
    const hot_spot = objects[12]; //（なでなで当たり判定）

    function step() {
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;

        window.addEventListener("resize", () => {
            centerX = window.innerWidth / 2;
            centerY = window.innerHeight / 2;
        });
        background.x += (background.targetX - background.x) * background.speed;
        background.y += (background.targetY - background.y) * background.speed;
        background.el.style.left = `${background.x}px`;
        background.el.style.top = `${background.y}px`;

        // 目を動かす
        eye.x += (eye.targetX - eye.x) * eye.speed;
        eye.y += (eye.targetY - eye.y) * eye.speed;
        eye.el.style.left = `${eye.x}px`;
        eye.el.style.top = `${eye.y}px`;
        // 目を動かす
        eyeback.x += (eyeback.targetX - eyeback.x) * eyeback.speed;
        eyeback.y += (eyeback.targetY - eyeback.y) * eyeback.speed;
        eyeback.el.style.left = `${eyeback.x}px`;
        eyeback.el.style.top = `${eyeback.y}px`;
        // 眉を動かす
        eyebrow.x += (eyebrow.targetX - eyebrow.x) * eyebrow.speed;
        eyebrow.y += (eyebrow.targetY - eyebrow.y) * eyebrow.speed;
        eyebrow.el.style.left = `${eyebrow.x}px`;
        eyebrow.el.style.top = `${eyebrow.y}px`;
        // 瞼_2を動かす
        eyelid2.x += (eyelid2.targetX - eyelid2.x) * eyelid2.speed;
        eyelid2.y += (eyelid2.targetY - eyelid2.y) * eyelid2.speed;
        eyelid2.el.style.left = `${eyelid2.x}px`;
        eyelid2.el.style.top = `${eyelid2.y}px`;
        // 瞼を動かす
        eyelid.x += (eyelid.targetX - eyelid.x) * eyelid.speed;
        eyelid.y += (eyelid.targetY - eyelid.y) * eyelid.speed;
        eyelid.el.style.left = `${eyelid.x}px`;
        eyelid.el.style.top = `${eyelid.y}px`;
        // 涙袋を動かす
        underEye.x += (underEye.targetX - underEye.x) * underEye.speed;
        underEye.y += (underEye.targetY - underEye.y) * underEye.speed;
        underEye.el.style.left = `${underEye.x}px`;
        underEye.el.style.top = `${underEye.y}px`;
        // 前髪１を動かす
        frontHear1.x += (frontHear1.targetX - frontHear1.x) * frontHear1.speed;
        frontHear1.y += (frontHear1.targetY - frontHear1.y) * frontHear1.speed;
        frontHear1.el.style.left = `${frontHear1.x}px`;
        frontHear1.el.style.top = `${frontHear1.y}px`;
        // 前髪２を動かす
        frontHear2.x += (frontHear2.targetX - frontHear2.x) * frontHear2.speed;
        frontHear2.y += (frontHear2.targetY - frontHear2.y) * frontHear2.speed;
        frontHear2.el.style.left = `${frontHear2.x}px`;
        frontHear2.el.style.top = `${frontHear2.y}px`;
        // 後ろ髪を動かす
        backHear.x += (backHear.targetX - backHear.x) * backHear.speed;
        backHear.y += (backHear.targetY - backHear.y) * backHear.speed;
        backHear.el.style.left = `${backHear.x}px`;
        backHear.el.style.top = `${backHear.y}px`;


        // 目の移動に連動して顔を動かす
        const eyeOffsetX = eye.x - (centerX + eye.offsetX);
        const eyeOffsetY = eye.y - (centerY + eye.offsetY);
        const faceTargetX = centerX + face.offsetX + eyeOffsetX * 0.5;
        const faceTargetY = centerY + face.offsetY + eyeOffsetY * 0.5;

        // 口パーツのY方向の動きの抑制：上方向はそのまま、下方向は0.4倍
        const mouthYOffset = eyeOffsetY >= 0 ? eyeOffsetY * 1.0 : eyeOffsetY;

        // 目の移動に連動して口を動かす
        const mouthTargetX = centerX + mouth.offsetX + eyeOffsetX * 1.0;
        const mouthTargetY = centerY + mouth.offsetY + mouthYOffset;

        const hot_spotTargetX = centerX + hot_spot.offsetX + eyeOffsetX * 0.5;
        const hot_spotTargetY = centerY + hot_spot.offsetY + eyeOffsetY * 0.5;

        face.x += (faceTargetX - face.x) * face.speed;
        face.y += (faceTargetY - face.y) * face.speed;
        face.el.style.left = `${face.x}px`;
        face.el.style.top = `${face.y}px`;
        mouth.x += (mouthTargetX - mouth.x) * mouth.speed;
        mouth.y += (mouthTargetY - mouth.y) * mouth.speed;
        mouth.el.style.left = `${mouth.x}px`;
        mouth.el.style.top = `${mouth.y}px`;

        hot_spot.x += (hot_spotTargetX - hot_spot.x) * hot_spot.speed;
        hot_spot.y += (hot_spotTargetY - hot_spot.y) * hot_spot.speed;
        hot_spot.el.style.left = `${hot_spot.x}px`;
        hot_spot.el.style.top = `${hot_spot.y}px`;

        requestAnimationFrame(step);
    }

    step();
}