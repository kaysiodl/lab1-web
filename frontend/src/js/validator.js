export function validate(value) {
    return value !== undefined && value !== null && value !== '';
}

export function validateNumber(value) {
    return /^-?[0-9]+(\.[0-9]+)?$/.test(value);
}

export function validateRange(value, min, max) {
    return value <= max & value >= min;
}


