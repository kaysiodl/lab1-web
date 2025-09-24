function validate(value) {
    return value !== undefined && value !== null && value !== '';
}

function validateNumber(value) {
    return /^-?[0-9]+(\.[0-9]+)?$/.test(value);
}

function validateRange(value, min, max) {
    return value <= max & value >= min;
}


