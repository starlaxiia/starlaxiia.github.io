const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let isPainting = false;

//styling
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

//mouse
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

//mobile
canvas.addEventListener('touchstart', startPainting);
canvas.addEventListener('touchend', stopPainting);
canvas.addEventListener('touchmove', draw);

function startPainting(e) {
    isPainting = true;
    draw(e);
}

function stopPainting() {
    isPainting = false;
    ctx.beginPath(); //reset path so lines dont connect
}

function draw(e) {
    if (!isPainting) return;
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.type.includes('touch')) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
}
