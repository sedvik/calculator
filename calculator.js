// Functions for basic arithmetic operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// operate function - takes an operator and 2 numbers and calls the corresponding basic arithmetic operation on the 2 numbers
function operate(operator, a, b) {
    let operation; // Stores the appropriate arithmetic operations
    switch(operator) {
        case '+':
            operation = add;
            break;
        case '-':
            operation = subtract;
            break;
        case '*':
            operation = multiply;
            break;
        case '/':
            operation = divide;
            break;
    }
    return operation(a, b);
}