const canvas = document.getElementById('coordinateSystem');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const step = 20;
const radius = 160;

const centerX = width / 2;
const centerY = height / 2;

let oldRadius = 'R';

const shapesInfo = {
    fillStyle: 'rgb(243, 176, 176, 0.5)',
    strokeStyle: '#d48a8a'
}

const labels = [
    {x: -(radius / 2), y: 0, text: '-R/2', formula: '-(R)/2'},
    {x: -radius, y: 0, text: '-R', formula: '-(R)'},
    {x: 0, y: -radius, text: '-R', formula: '-(R)'},
    {x: 0, y: -(radius / 2), text: '-R/2', formula: '-(R)/2'},

    {x: (radius / 2), y: 0, text: 'R/2', formula: 'R/2'},
    {x: 0, y: (radius / 2), text: 'R/2', formula: 'R/2'},
    {x: radius, y: 0, text: 'R', formula: 'R'},
    {x: 0, y: radius, text: 'R', formula: 'R'}
];

export function draw() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawAxes();
    drawShapes();
    labels.forEach(label => {
        drawPoints(label);
    });
}

function drawLine(x1, y1, x2, y2, color, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawAxes() {
    drawLine(0, centerY, width, centerY, "black", 2);
    drawLine(centerX, 0, centerX, height, "black", 2);

    drawArrows();
}

function drawArrows() {
    drawLine(width - 10, centerY - 5, width, centerY, 'black', 2);
    drawLine(width - 10, centerY + 5, width, centerY, 'black', 2);

    drawLine(centerX - 5, 10, centerX, 0, 'black', 2);
    drawLine(centerX + 5, 10, centerX, 0, 'black', 2);


    ctx.font = "16px Arial";
    ctx.fillText('X', width - 15, centerY - 10);
    ctx.fillText('Y', centerX + 10, 15);
    ctx.fillText('0', centerX - 10, centerY + 15);
}


function drawGrid() {
    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 0.5;

    for (let x = step; x < width; x += step) {
        drawLine(x, 0, x, height)
    }

    for (let y = step; y < height; y += step) {
        drawLine(0, y, width, y);
    }
}

export function drawLabels() {
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';

    labels.forEach(label => {
        ctx.fillText(label.text, centerX + label.x + 5, centerY - label.y - 5);
    });
}

function drawPoints(label) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(label.x + centerX, label.y + centerY, 2, 0, 2 * Math.PI);
    ctx.fill();
}

function drawShapes() {
    ctx.fillStyle = shapesInfo.fillStyle;
    ctx.strokeStyle = shapesInfo.strokeStyle;
    drawArc();
    drawTriangle();
    drawRect();
}

function drawArc() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius / 2, -Math.PI / 2, 0);
    ctx.fill();
}

function drawTriangle() {
    ctx.beginPath();
    ctx.moveTo(centerX - radius / 2, centerY);
    ctx.lineTo(centerX, centerY + radius / 2);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
}

function drawRect() {
    ctx.beginPath();
    ctx.fillRect(centerX, centerY, radius, radius);
}

// export function updateLabels(inputR){
//     ctx.clearRect(centerX - radius - 30, centerY - radius - 30,
//         2 * radius + 60, 2 * radius + 60);
//
//     ctx.fillStyle = "black";
//     labels.forEach(label => {
//         ctx.fillText(computeRadius(label.formula, inputR), centerX + label.x + 5, centerY - label.y - 5);
//         drawPoints(label);
//     });
// }

function computeRadius(formula, inputR) {
    let newFormula = formula.replace("R", inputR);
    return eval(newFormula);
}

export function animateLabels(inputR) {
    fadeOut(() => {
        fadeIn(inputR);
    });
}

function fadeOut(callback) {
    let opacity = 1;

    function animate() {
        opacity -= 0.03;

        draw();

        ctx.font = '18px serif';
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        labels.forEach(label => {
            if (oldRadius === 'R') {
                ctx.fillText(label.text, centerX + label.x + 5, centerY - label.y - 5)
            } else {
                const computedValue = computeRadius(label.formula, oldRadius);
                ctx.fillText(computedValue, centerX + label.x + 5, centerY - label.y - 5);
            }
        });

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    }

    requestAnimationFrame(animate);
}

function fadeIn(inputR) {
    oldRadius = inputR;
    let opacity = 0;

    function animate() {
        opacity += 0.03;

        draw();

        ctx.font = '18px serif';
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        labels.forEach(label => {
            const computedValue = computeRadius(label.formula, inputR);
            ctx.fillText(computedValue, centerX + label.x + 5, centerY - label.y - 5);
        });

        if (opacity < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

