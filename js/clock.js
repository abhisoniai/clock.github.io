// Analog Clock + Digital Clock implementation

function initClock() {
    const img = document.getElementById('clock-face');
    const canvas = document.getElementById('clock-hands');
    if (!canvas || !img) return;

    function startClock() {
        const displaySize = 500;
        canvas.width = displaySize;
        canvas.height = displaySize;

        const ctx = canvas.getContext('2d');
        const radius = canvas.height / 2 * 0.90;

        // Audio for tick sounds (alternating)
        const tickSound1 = new Audio('assets/tick.mp3');
        const tickSound2 = new Audio('assets/tick2.mp3');
        let tickCounter = 0;

        function drawClock() {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTime(ctx, radius);

            // Play tick sound if enabled
            const soundToggle = document.getElementById('sound-toggle');
            if (soundToggle && soundToggle.checked) {
                const currentSound = (tickCounter % 2 === 0) ? tickSound1 : tickSound2;
                currentSound.currentTime = 0;
                currentSound.play().catch(() => {});
                tickCounter++;
            }
        }

        function drawTime(ctx, radius) {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();

            // Hour hand
            const hourAngle = ((hour % 12) + minute / 60) * Math.PI / 6;
            drawHand(ctx, hourAngle, radius * 0.5, 12, '#474545', true);

            // Minute hand
            const minuteAngle = (minute + second / 60) * Math.PI / 30;
            drawHand(ctx, minuteAngle, radius * 0.75, 8, '#474545', true);

            // Golden second hand
            const secondAngle = second * Math.PI / 30;
            drawGoldenSecondHand(ctx, secondAngle);
        }

        // Elegant minimalist golden second hand
        // Precision gold metal strip with subtle thickness taper
        // Real proportions: 1.0m total, 0.10m cap, 0.29m rear extension
        function drawGoldenSecondHand(ctx, angle) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);

            // Scale from real proportions (1.0m = 100%) to canvas pixels
            // Center cap = 10% of total → used as visual anchor
            const totalLength = 155;          // total hand length in px (center to tip) - SHORTER
            const capD = 10;                   // center cap diameter (0.10m scaled)
            const rearExt = 23;                // rear extension (0.29m scaled) - proportional
            const frontLen = totalLength - capD / 2;  // main needle from cap edge to tip

            // Thickness profile: base 100%, middle 92%, near tip 70%, tip 45%
            const baseW = 5;                   // 100% thickness at base - THINNER
            const midW = 4;                    // 92% of ~5
            const nearTipW = 3;                // 70% of ~4
            const tipW = 2;                    // ~45% near very end

            // Colors
            const mainGold = '#C8A96E';
            const highlight = '#E8D5A0';
            const shadow = '#A08450';

            // ---- Main needle body (front half) ----
            // Ultra-slim rectangular strip with very subtle taper
            // Mostly parallel edges, tiny narrowing only near tip

            ctx.beginPath();

            // Starting point: just outside the cap on the right
            const startY = capD / 2;
            const endY = -totalLength + capD / 2;  // tip at front

            // Right edge (going from base toward tip)
            ctx.moveTo(baseW / 2, -startY);
            // Mostly parallel for first 70%
            ctx.lineTo(baseW / 2, -startY - frontLen * 0.15);      // still ~8px
            ctx.lineTo(midW / 2, -startY - frontLen * 0.55);      // slight taper to ~7px
            ctx.lineTo(nearTipW / 2, -startY - frontLen * 0.85);  // narrowing to ~5px
            ctx.lineTo(tipW / 2, -startY - frontLen * 0.95);      // ~3px near tip
            // Flat ending tip
            ctx.lineTo(0, endY);  // tip center

            // Left edge (mirror back down)
            ctx.lineTo(-tipW / 2, -startY - frontLen * 0.95);
            ctx.lineTo(-nearTipW / 2, -startY - frontLen * 0.85);
            ctx.lineTo(-midW / 2, -startY - frontLen * 0.55);
            ctx.lineTo(-baseW / 2, -startY - frontLen * 0.15);
            ctx.lineTo(-baseW / 2, -startY);
            ctx.closePath();

            // Fill main body
            ctx.fillStyle = mainGold;
            ctx.fill();

            // ---- Thin highlight along top edge ----
            ctx.beginPath();
            ctx.moveTo(0, -startY);
            ctx.lineTo(baseW / 2, -startY);
            ctx.lineTo(baseW / 2, -startY - 1);
            ctx.lineTo(-baseW / 2, -startY - 1);
            ctx.lineTo(-baseW / 2, -startY);
            ctx.closePath();
            ctx.fillStyle = highlight;
            ctx.globalAlpha = 0.35;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // ---- Bottom edge shadow ----
            ctx.beginPath();
            ctx.moveTo(baseW / 2, -startY - frontLen * 0.95);
            ctx.lineTo(tipW / 2, -startY - frontLen * 0.95);
            ctx.lineTo(0, endY);
            ctx.lineTo(-tipW / 2, -startY - frontLen * 0.95);
            ctx.lineTo(-baseW / 2, -startY - frontLen * 0.85);
            ctx.lineTo(-baseW / 2, -startY - frontLen * 0.15);
            ctx.closePath();
            ctx.fillStyle = shadow;
            ctx.globalAlpha = 0.15;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // ---- Rear counterweight (behind pivot) ----
            // Short extension with subtle diamond shape
            ctx.beginPath();
            ctx.moveTo(baseW / 2, startY);
            ctx.lineTo(rearExt, startY + rearExt * 0.15);    // outward flare
            ctx.lineTo(rearExt * 0.8, startY + rearExt * 0.35);
            ctx.lineTo(0, startY + rearExt * 0.45);          // center point
            ctx.lineTo(-rearExt * 0.8, startY + rearExt * 0.35);
            ctx.lineTo(-rearExt, startY + rearExt * 0.15);
            ctx.lineTo(-baseW / 2, startY);
            ctx.closePath();

            ctx.fillStyle = mainGold;
            ctx.fill();

            // Rear counterweight highlight
            ctx.beginPath();
            ctx.moveTo(0, startY);
            ctx.lineTo(baseW / 2, startY);
            ctx.lineTo(rearExt, startY + rearExt * 0.15);
            ctx.lineTo(rearExt * 0.8, startY + rearExt * 0.35);
            ctx.lineTo(0, startY + rearExt * 0.35);
            ctx.closePath();
            ctx.fillStyle = highlight;
            ctx.globalAlpha = 0.25;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // ---- Center cap / pivot hub ----
            ctx.beginPath();
            ctx.arc(0, 0, capD / 2, 0, 2 * Math.PI);
            ctx.fillStyle = mainGold;
            ctx.fill();
            ctx.strokeStyle = shadow;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Inner pivot highlight
            ctx.beginPath();
            ctx.arc(0, 0, capD / 2 - 2, 0, 2 * Math.PI);
            ctx.fillStyle = highlight;
            ctx.globalAlpha = 0.4;
            ctx.fill();
            ctx.globalAlpha = 1.0;

            ctx.restore();
        }

        function drawHand(ctx, angle, length, width, color, isTapered) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);

            if (isTapered) {
                const halfWidth = width / 2;
                ctx.beginPath();
                ctx.moveTo(-halfWidth, -length * 0.05);
                ctx.lineTo(-halfWidth * 0.25, -length);
                ctx.lineTo(halfWidth * 0.25, -length);
                ctx.lineTo(halfWidth, -length * 0.05);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            }

            ctx.restore();
        }

        drawClock();
        setInterval(drawClock, 1000);
    }

    if (img.complete) {
        startClock();
    } else {
        img.addEventListener('load', startClock);
    }

    // Digital clock update (always 12-hour format)
    function updateDigitalClock() {
        const now = new Date();
        let hours = now.getHours();
        const period = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        const hoursStr = String(hours).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const display = document.getElementById('current-time');
        if (display) {
            display.textContent = `${hoursStr}:${minutes}:${seconds}${period}`;
        }
    }

    updateDigitalClock();
    setInterval(updateDigitalClock, 1000);
}

document.addEventListener('DOMContentLoaded', initClock);
