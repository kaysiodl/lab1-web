const errorForm = (message, input) => {
    let oldErr = input.parentElement.querySelector('.error-text');
    if (oldErr) clearErrors();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-text';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontStyle = '14px';
    input.parentElement.appendChild(errorDiv);
}

function clearErrors() {
    document.querySelectorAll('.error-text').forEach(element => element.remove());
}

function validate(input) {
    if (!input.value) {
        errorForm('Введите значение', input);
        return false;
    }
    return true;
}

function validateNumber(input) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(input.value)) {
        errorForm('Вводите только цифры', input);
        return false;
    }
    return true;
}

function validateRange(input, min, max) {
    if (input.value < min) {
        errorForm(`Х должен быть больше либо равен ${min}`, input);
        return false;
    }
    if (input.value > max) {
        errorForm(`Х должен быть меньше либо равен ${max}`, input);
        return false;
    }
    return true;
}

function validateX(input) {
    return validate(input) && validateNumber(input) && validateRange(input, -5, 3);
}

