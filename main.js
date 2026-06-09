function init() {
  const $calculation = document.querySelector("[data-calculation]");
  const $result = document.querySelector("[data-result]");
  const $numbers = document.querySelectorAll("[data-num]");
  const $operators = document.querySelectorAll("[data-operator]");
  const $equal = document.querySelector("[data-equals]");
  const $clear = document.querySelector("[data-clear]");
  const $delete = document.querySelector("[data-delete]");
  const $percent = document.querySelector("[data-percent]");
  const $sign = document.querySelector("[data-sign]");

  let currentOperand = "0";
  let currentOperator = "";
  let firstOperand = null;
  let waitingForSecondOperand = false;

  // Events
  $numbers.forEach(function (num) {
    num.addEventListener("click", function (event) {
      const number = event.target.textContent;
      if (waitingForSecondOperand) {
        resetCurrentOperand();
        waitingForSecondOperand = false;
      }
      const validOperand = validateOperand(number);
      updateCalcDisplay(validOperand);
    });
  });

  $operators.forEach(function (operator) {
    operator.addEventListener("click", function (event) {
      const operator = event.target.textContent;
      handleOperator(operator);
      updateCalcDisplay(firstOperand + currentOperator);
    });
  });

  $equal.addEventListener("click", handleEqual);
  $percent.addEventListener("click", handlePercent);
  $sign.addEventListener("click", handleToggleSign);
  $delete.addEventListener("click", handleDelete);
  $clear.addEventListener("click", clearAll);

  // Functions
  function validateOperand(input) {
    // Avoid multiple leading zeros
    if (currentOperand === "0" && input === "0") {
      return currentOperand;
    }
    // Starting with a decimal appends the decimal to the initial 0, 0.2 for example
    else if (currentOperand === "0" && input === ".") {
      return currentOperand += ".";
    }
    // Avoid adding multiple decimals, 0....2 for example
    else if (currentOperand.includes(".") && input === ".") {
      return currentOperand;
    }
    // Avoid numbers starting with 0, 07 for example
    else if (currentOperand === "0" && input !== ".") {
      currentOperand = input;
      return currentOperand;
    }
    // Append the number to the calculation
    else {
      currentOperand += input;
      return currentOperand;
    }
  }

  function handleOperator(operator) {
    waitingForSecondOperand = true;
    firstOperand = currentOperand;
    currentOperator = operator;
  }

  function handleToggleSign() {
    if (currentOperand === "0") return;
    currentOperand = +currentOperand;
    currentOperand = currentOperand * -1;
    currentOperand = currentOperand.toString();
    updateCalcDisplay(currentOperand);
  }

  function resetCurrentOperand() {
    currentOperand = "0";
  }

  function calculate(firstOperand, currentOperator, currentOperand) {
    // If any of the operands or operator is missing, return
    if (!firstOperand || !currentOperator || !currentOperand) return;
    // Convert string to number
    const numOne = +firstOperand;
    const numTwo = +currentOperand;

    // Map operators to functions using actual mathematic operators
    const operators = {
      "+": function (a, b) {
        return a + b;
      },
      "-": function (a, b) {
        return a - b;
      },
      "*": function (a, b) {
        return a * b;
      },
      "/": function (a, b) {
        return a / b;
      }
    }
    return operators[currentOperator](numOne, numTwo);
  }

  function handlePercent() {
    // Convert current operand string to number, divide it by 100, reassign the value as a string and update calc display
    currentOperand = +currentOperand / 100;
    currentOperand = currentOperand.toString();
    updateCalcDisplay(currentOperand);
  }

  function handleEqual() {
    const result = calculate(firstOperand, currentOperator, currentOperand);
    if (!result && result !== 0) return;
    currentOperand = result;
    updateCalcDisplay(result);
    displayResult(result);
  }

  function displayResult(result) {
    $result.textContent = result;
  }

  function updateCalcDisplay(str) {
    $calculation.textContent = str;
  }

  function handleDelete() {
    // Backspace / delete shouldn't do anything if the current operand is already 0
    if (currentOperand === "0") return;

    // Keep removing the last character and reasign the current operand
    currentOperand = currentOperand.slice(0, -1);

    // If the last remaining character is also deleted, we reset the current operand to initial value "0"
    if (currentOperand.length === 0) {
      resetCurrentOperand();
    }
    updateCalcDisplay(currentOperand);
  }

  function clearAll() {
    currentOperand = "0";
    currentOperator = "";
    firstOperand = null;
    waitingForSecondOperand = false;
    $calculation.textContent = "0";
    $result.textContent = "0";
  }
}

init();