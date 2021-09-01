// Global variables
let num1 = '';
let num2 = '';
let operator = '';

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
    let operation;
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

// Helper functions
function display(num) {
    document.querySelector('#display p').textContent = num;
}

// Event Handler Functions
function handleNumberClick(e) {
    // Append clicked number (in string format) to num1
    num1 += e.target.value;

    // Display the new value
    display(num1);
}

// Add Event Listeners to buttons
const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});