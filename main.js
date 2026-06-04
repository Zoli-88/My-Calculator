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

  $numbers.forEach(function (num) {
    num.addEventListener("click", function (event) {
      const number = event.target.textContent;
      const validOperand = validateOperand(number);
      updateCalcDisplay(validOperand);
    });
  });

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

  function updateCalcDisplay(str) {
    $calculation.textContent = str;
  }
}

init();