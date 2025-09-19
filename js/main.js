const rButtons = document.querySelectorAll('.r-button');
const submitButton = document.getElementById('submitButton');
let selectedR = false;


document.addEventListener('DOMContentLoaded', function () {
    draw();
    drawLabels();
    // updateLabels(6);
});

rButtons.forEach(button => {
    button.addEventListener('click', function () {
        selectedR = true;
        const value = parseFloat(button.value);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw();
        updateLabels(value);
    });
});

submitButton.addEventListener('click', function () {
    event.preventDefault();
    const inputX = document.getElementById('x');
    const inputY = document.getElementById('y');

    let isValid = validateX(inputX) & validate(inputY) & selectedR;
    if (isValid) clearErrors();

});