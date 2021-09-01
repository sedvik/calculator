// Global variables
let num1 = '';
let num2 = '';
let operator = '';
let calculatedResultDisplayed = false;

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
    if (b === 0) {
        return "Dunno, chief."
    }
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

/* Helper functions */

// display function - displays the provided number in the calculator display
function display(num) {
    document.querySelector('#display p').textContent = num;
}



/* Event Handler Functions */
function handleNumberClick(e) {
    // Reset num2 if a calculated result is currently being displayed
    if (calculatedResultDisplayed) {
        num2 = '';
        calculatedResultDisplayed = false;
    }
    
    // Append clicked number (in string format) to num2
    num2 += e.target.value;

    // Display the new value
    display(num2);
}

function handleOperationClick(e) {
    // If num1 and num2 both have current values, calculate the outcome, display it, and store it in num2
    if (num1 !== '' && num2 !== '') {
        const result = operate(operator, Number(num1), Number(num2));
        display(result);
        calculatedResultDisplayed = true;
        num2 = result;
    }

    // Update the value of the global operator value
    operator = e.target.value;

    // Store the current value of num2 in num1 and reset num2
    num1 = num2;
    num2 = '';
}

function handleEqualClick() {
    // If no operator has been selected, or both num1 and num2 aren't populated, exit the function
    if (operator === '' || (num1 === '' || num2 === '')) {
        return;
    }
    
    // Calculate the operation result using the operate function
    const result = operate(operator, Number(num1), Number(num2));

    // Display the outcome
    display(result);
    calculatedResultDisplayed = true;

    // Store the outcome in num2 and clear num1 and operator values
    num2 = result;
    num1 = '';
    operator = '';
}

// resetState function - resets the initial state of the calculator
function resetState() {
    num1 = '';
    num2 = '';
    operator = '';
    display('');
    calculatedResultDisplayed = false;
}

// Add Event Listeners to buttons
const numButtons = document.querySelectorAll('.number');
numButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});

const operationButtons = document.querySelectorAll('.operator');
operationButtons.forEach(button => {
    button.addEventListener('click', handleOperationClick);
});

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', handleEqualClick);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', resetState);