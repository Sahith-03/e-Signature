// Get the canvas element
const canvas = document.getElementById('signatureCanvas');
const context = canvas.getContext('2d');

// Variables to track mouse movements
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let stylusColor = '#000000';

var signatureData = [];

// context.strokestyle = '#ff0000';
// context.stroke();

// Event listeners to track mouse movements
canvas.addEventListener('mousedown', (e) => {
    
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;
    signatureData.push([lastX, lastY, x, y]);
    drawLine(lastX, lastY, x, y);
    [lastX, lastY] = [x, y];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Function to draw a line between two points
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function reDraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < signatureData.length; i++) {
        context.beginPath();
        context.moveTo(signatureData[i][0], signatureData[i][1]);
        context.lineTo(signatureData[i][2], signatureData[i][3]);
        context.stroke();
        context.closePath();
    }    
}

var colors = document.getElementsByClassName('default-color');

for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', (e) => {
        stylusColor = colors[i].style.backgroundColor;
        context.strokeStyle = stylusColor;
        reDraw();
    });
}

// Function to clear the canvas
document.getElementById('clearButton').addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    signatureData = [];
});

document.getElementById('multi').addEventListener('input', (e) => {
    stylusColor = e.target.value;
    document.getElementById('circular-label').style.backgroundColor = stylusColor;
    context.strokeStyle = stylusColor;
    if(signatureData.length > 0){
        reDraw();
    }
});

document.getElementById('fontSize').addEventListener('input', (e) => {
    context.lineWidth =  parseInt(e.target.value);
    if(signatureData.length > 0){
        reDraw();
    }
})

document.getElementById("download").addEventListener("click", () => {
    var dataURL = canvas.toDataURL("image/png");
    
    var downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "signature.png";
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
