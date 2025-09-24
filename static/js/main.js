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
    // updateLabels(6);
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

submitButton.addEventListener('click', function () {
    event.preventDefault();
    const data = updateData();
    let isValid = printErrors(data);
    if (isValid) {
        // sendToServer(data).then(r => {});
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
    if (!validate(data.x)) {printError(inputX, 'Введите значение Х'); isValid = false}
    else if (!validateNumber(data.x)) {printError(inputX, 'Введите целое или дробное число'); isValid = false}
    else if (!validateRange(data.x, -3, 5)) {
        printError(inputX, 'Число должно быть в пределах от -3 до 5');
        isValid = false;
    }
    if (!validate(data.y)) {printError(inputY, 'Выберите значение Y'); isValid = false}
    if (!validate(data.r)) {printError(inputR, 'Выберите значение R'); isValid = false}
    return isValid;
}

function clearErrors() {
    document.querySelectorAll('.error-text').forEach(element => element.remove());
}

// async function sendToServer(data) {
//     try {
//         const formData = new FormData();
//         formData.append('x', data.x);
//         formData.append('y', data.y);
//         formData.append('r', data.r);
//
//         const response = await fetch('/', {
//             method: 'POST',
//             body: formData
//         });
//
//         if (response.ok) {
//             const result = await response.text();
//             displayResult(result);
//         } else {
//             throw new Error('Server error');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         displayResult('Ошибка соединения с сервером');
//     }
// }
//
// function displayResult(result) {
//     let resultsContainer;
//     if (resultsContainer) {
//         resultsContainer.innerHTML = `<div class="result">${result}</div>`;
//     } else {
//         alert(result);
//     }
// }