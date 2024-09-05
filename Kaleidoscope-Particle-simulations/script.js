const canvas = document.getElementById('kaleidoscopeCanvas');
const ctx = canvas.getContext('2d');
const segmentsSlider = document.getElementById('segments');
const colorPicker = document.getElementById('color');
const speedSlider = document.getElementById('speed');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let segments = parseInt(segmentsSlider.value);
let color = colorPicker.value;
let speed = parseFloat(speedSlider.value);
let angle = 10;

// Update component values based on user input
function updateValues() {
    segments = parseInt(segmentsSlider.value);
    color = colorPicker.value;
    speed = parseFloat(speedSlider.value);
}

// Draw the kaleidoscope pattern
function drawKaleidoscope() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < segments; i++) {
        const segmentAngle = (i * 2 * Math.PI) / segments;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(segmentAngle + angle);
        ctx.translate(-cx, -cy);

        // Draw a simple shape (e.g., triangle) that will be reflected
        ctx.beginPath();
        ctx.moveTo(cx, cy - radius);
        ctx.lineTo(cx - radius, cy + radius);
        ctx.lineTo(cx + radius, cy + radius);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
    }

    angle += speed * 0.01;
    requestAnimationFrame(drawKaleidoscope);
}

// Initial drawing
drawKaleidoscope();

// Event listeners for sliders
segmentsSlider.addEventListener('input', updateValues);
colorPicker.addEventListener('input', updateValues);
speedSlider.addEventListener('input', updateValues);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
});
