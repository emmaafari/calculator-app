let firstNumber;
let secondNumber;
let operator;
let currentCalculation;

let previousOperator; // To keep track of the previous operator
function assignNumberValue(value) {
	if (operator === undefined) {
		firstNumber = firstNumber ? firstNumber + value : value;
	} else {
		secondNumber = secondNumber ? secondNumber + value : value;
	}
}

const displayText = document.getElementById("displayText");
const displayResult = document.getElementById("displayResult");
const numberBtnList = document.querySelectorAll(".numberBtn");
const operatorBtnList = document.querySelectorAll(".operator");
const actionBtnList = document.querySelectorAll(".actionBtn");
const errorDisplay = document.getElementById("displayError");

// Handle number buttons
for (let index = 0; index < numberBtnList.length; index++) {
	const numberBtn = numberBtnList[index];

	numberBtn.addEventListener("click", (event) => {
		errorDisplay.innerText = ""; // Clear any previous error message
		const value = event.target.value;

		// If result is already displayed and user clicks a number, set that as first number
		if (currentCalculation !== undefined && operator === undefined && secondNumber === undefined) {
			firstNumber = value;
			displayResult.innerText = value;
			return;
		}

		// Prevent multiple decimal points in a number
		if (value === ".") {
			if (operator === undefined) {
				if (firstNumber && firstNumber.includes(".")) {
					return; // Prevent adding another decimal point to the first number
				}
				if (!firstNumber) {
					firstNumber = "0"; // If firstNumber is empty, start with "0."
					displayResult.innerText = firstNumber;
				}
			} else {
				if (secondNumber && secondNumber.includes(".")) {
					return; // Prevent adding another decimal point to the second number
				}
				if (!secondNumber) {
					secondNumber = "0"; // If secondNumber is empty, start with "0."
				}
			}
		}

		displayResult.innerText += value;
		assignNumberValue(value);
	});
}

//Handle operator buttons
for (let index = 0; index < operatorBtnList.length; index++) {
	const operatorBtn = operatorBtnList[index];

	operatorBtn.addEventListener("click", (event) => {
		const value = event.target.value;
		errorDisplay.innerText = "";

		// Prevent operator click if there is no first number
		if (firstNumber === undefined) return;

		//perform calculation if there is an operator and second number already defined
		if (operator !== undefined && secondNumber !== undefined) {
			performCalculation(); // Perform calculation if possible
			operator = value; // Update operator to the newly clicked operator
			displayResult.innerText += operator;
			return;
		}

		// Prevent adding multiple operators in a row
		if (operator !== undefined && secondNumber === undefined) {
			// Replace the last operator in the display with the new one
			displayResult.innerText = displayResult.innerText.slice(0, -1) + value;
			operator = value; // Update the operator to the newly clicked operator
			return;
		}

		operator = value;

		displayResult.innerText += operator;

		performCalculation(); // Perform calculation if possible
	});
}

//Hanlde CLEAR AND DELETE buttons
for (let index = 0; index < actionBtnList.length; index++) {
	const actionBtn = actionBtnList[index];
	actionBtn.addEventListener("click", (event) => {
		const value = event.target.value;
		if (value === "clear") {
			firstNumber = undefined;
			secondNumber = undefined;
			operator = undefined;
			currentCalculation = undefined;
			displayText.innerText = "";
			displayResult.innerText = "";
			errorDisplay.innerText = "";
		} else {
			// Handle delete action
			if (displayResult.innerText.length === 0) return; // Nothing to delete
			displayResult.innerText = displayResult.innerText.slice(0, -1);
		}
	});
}

//HANDLE EQUAL BUTTON
document.getElementById("equalBtn").addEventListener("click", () => {
	performCalculation();
	operator = undefined; // Reset operator after calculation
});

function performCalculation() {
	if (firstNumber !== undefined && secondNumber !== undefined && operator !== undefined) {
		const result = operate(Number(firstNumber), Number(secondNumber), operator);
		if (typeof result === "string") {
			errorDisplay.innerText = result; // Display error message
			displayResult.innerText = "";
			firstNumber = undefined;
			secondNumber = undefined;
			operator = undefined;
			return;
		}
		displayResult.innerText = result;
		displayText.innerText = ` ${firstNumber} ${operator} ${secondNumber} = ${result}\n`;
		firstNumber = result;
		currentCalculation = result;
		secondNumber = undefined;
	}
}

function add(firstNumber, secondNumber) {
	return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
	return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
	return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
	if (secondNumber === 0) {
		return "Cannot divide by zero";
	}
	return firstNumber / secondNumber;
}

function factorial(firstNumber, secondNumber) {
	return firstNumber % secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
	let result;
	switch (operator) {
		case "+":
			result = add(firstNumber, secondNumber);
			break;
		case "-":
			result = subtract(firstNumber, secondNumber);
			break;
		case "*":
			result = multiply(firstNumber, secondNumber);
			break;
		case "/":
			result = divide(firstNumber, secondNumber);
			break;
		case "%":
			result = factorial(firstNumber, secondNumber);
			break;
		default:
			throw new Error("Invalid operator");
	}

	if (result === "Cannot divide by zero") {
		return result;
	} else if (Number.isInteger(result)) {
		return result;
	} else {
		return parseFloat(result.toFixed(3));
	}
}
