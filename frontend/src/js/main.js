import {
    validate,
    validateRange,
    validateNumber
} from './validator'

import {
    draw,
    drawLabels,
    updateLabels
} from './coordinateSystem'

import {
    saveResult,
    loadResults
} from './storage'

import '../scss/styles.scss'

const rButtons = document.querySelectorAll('.r-button');
const submitButton = document.getElementById('submitButton');
const inputX = document.getElementById('x');
const inputY = document.getElementById('y');
const inputR = document.getElementById('r');
let r = null;

function updateData() {
    return {
        x: inputX.value,
        y: inputY.value,
        r: r
    }
}

document.addEventListener('DOMContentLoaded', function () {
    draw();
    drawLabels();
    loadResults();
});

rButtons.forEach(button => {
    button.addEventListener('click', function () {
        r = this.value;

        const value = parseFloat(button.value);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw();
        updateLabels(value);
    });
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const data = updateData();
    let isValid = printErrors(data);

    if (isValid) {
        sendRequest(data.x, data.y, data.r)
            .then(data => {
                addTableRow(data);
                saveResult(data);
            })
            .catch(err => {
                alert(err);
            });
    }
});

function printError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-text';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontStyle = '14px';
    element.parentElement.appendChild(errorDiv);
}

function printErrors(data) {
    clearErrors();
    let isValid = true;
    if (!validate(data.x)) {
        printError(inputX, 'Введите значение Х');
        isValid = false;
    } else if (!validateNumber(data.x)) {
        printError(inputX, 'Введите целое или дробное число');
        isValid = false;
    } else if (!validateRange(data.x, -3, 5)) {
        printError(inputX, 'Число должно быть в пределах от -3 до 5');
        isValid = false;
    }
    if (!validate(data.y)) {
        printError(inputY, 'Выберите значение Y');
        isValid = false;
    }
    if (!validate(data.r)) {
        printError(inputR, 'Выберите значение R');
        isValid = false;
    }
    return isValid;
}

function clearErrors() {
    document.querySelectorAll('.error-text').forEach(element => element.remove());
}

async function sendRequest(x, y, r) {
    try {
        const response = await fetch('http://localhost:8080/check', {         //24055/fcgi-bin/server.jar/check
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({x, y, r})
        });

        if (!response.ok) throw new Error(`${response.status}, ${response.message}`);
        return await response.json();
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

function addTableRow(data) {
    const table = document
        .getElementById("resultsTable")
        .getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    addCell(row, data.x);
    addCell(row, data.y);
    addCell(row, data.r);
    addCell(row, data.hit);
    addCell(row, data.currentTime);
    addCell(row, data.time);
}

function addCell(row, value) {
    const cell = row.insertCell();
    const text = document.createTextNode(value);
    cell.appendChild(text);
}

