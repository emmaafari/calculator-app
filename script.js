let firstNumber;
let secondNumber;
let operator;

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
		console.log("Cannot divide by zero");
	}
	return firstNumber / secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
	console.log(operator);

	//Add code to take user inputs
	let result;
	switch (operator) {
		case "add":
			result = add(firstNumber, secondNumber);
			break;
		case "subtract":
			result = subtract(firstNumber, secondNumber);
			break;
		case "multiply":
			result = multiply(firstNumber, secondNumber);
			break;
		case "divide":
			result = divide(firstNumber, secondNumber);
			break;
		default:
			throw new Error("Invalid operator");
	}

	console.log(`Result is ${result}`);
}

operate(30, 20, "subtract");
