// Global variables
let num1 = '';
let num2 = '';
let operator = '';
let calculatedResultDisplayed = false;

/* Functions for basic arithmetic operations */
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
    const displayTextField = document.querySelector('#display p');
    num = num.toString();
    
    // If number of digits is greater than or equal to 15, display it using scientific notation
    if (num.length >= 15) {
        displayTextField.textContent = Number(num).toExponential(4);
    } else {
        displayTextField.textContent = num;
    }
}

// highlightOperator function - Adds the .highlight class to an operator button after it has been clicked
function highlightOperator(operatorButton) {
    // Unhighlight any currently selected operator
    unHighlightOperators();

    // Highlight the desired operator
    operatorButton.classList.add('highlight');
}

// unHighlightOperators function - removes the .highlight class from all operator buttons.
function unHighlightOperators() {
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.classList.remove('highlight');
    })
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

    // Unhighlight any selected operator buttons
    unHighlightOperators();

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

    // Highlight the appropriate operator button
    highlightOperator(e.target);

    // Store the current value of num2 in num1 and reset num2 if num2 has a current value
    if (num2 !== '') {
        num1 = num2;
        num2 = '';
    }
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

// handloUndo - removes the last character from num2
function handleUndo() {
    // Exit from function if a calculated result is currently being displayed or if num2 has nothing stored
    if (calculatedResultDisplayed || num2 === '') {
        return;
    }

    // Remove 1 character from end of num2
    num2 = num2.substring(0, num2.length - 1);

    // Display the new number
    display(num2);
}

// addDecimalPlace function - adds a decimal place to num2
function addDecimalPlace() {
    // Return from function if num2 already has a decimal
    if (num2.includes('.')) {
        return;
    }

    // Reset num2 if a calculated result is currently being displayed
    if (calculatedResultDisplayed) {
        num2 = '';
        calculatedResultDisplayed = false;
    }

    // Add a decimal place and display the number
    num2 += '.';
    display(num2);
}

// resetState function - resets the initial state of the calculator
function resetState() {
    num1 = '';
    num2 = '';
    operator = '';
    display('');
    calculatedResultDisplayed = false;
    unHighlightOperators();
}

// blurElement function - unfocuses the currently selected element
function blurElement(e) {
    e.target.blur();
}

// Add click Event Listeners to buttons
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

const undoButton = document.querySelector('#undo');
undoButton.addEventListener('click', handleUndo);

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', addDecimalPlace);

// Add keyboard event listeners
window.addEventListener('keydown', function(e) {
    const key = e.key;
    const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Delete", "Backspace", "Enter", "/", "*", "-", "+", "."];

    // if key is valid, click corresponding button
    if (validKeys.includes(key)) {
        document.querySelector(`button[value="${key}"]`).click();
    }
});

// Unfocus any clicked buttons to prevent undesired behavior when mixing keyboard and button input
const calcContainer = document.querySelector('#calc-container');
calcContainer.addEventListener('click', blurElement);