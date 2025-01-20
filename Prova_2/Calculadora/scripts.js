const previousText = document.querySelector("#previous");
const currentText = document.querySelector("#current");
const buttons = document.querySelectorAll("#buttons button");

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.currentOperation = "";
  }

  addNumber(number) {
    console.log(number);
    if (number === "." && this.currentText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = number;
    this.updateDisplay();
  }

  processOperation(operation) {
    if (this.currentText.innerText === "" && operation !== "C") {
      if (this.previousText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let outcome;
    let previous = +this.previousText.innerText.split(" ")[0];
    let current = +this.currentText.innerText;

    switch(operation) {
      case "+":
        outcome = previous + current;
        this.updateDisplay(outcome, operation, current, previous);
        break;
      case "-":
        outcome = previous - current;
        this.updateDisplay(outcome, operation, current, previous);
        break;
      case "*":
        outcome = previous * current;
        this.updateDisplay(outcome, operation, current, previous);
        break;
      case "/":
        outcome = previous / current;
        this.updateDisplay(outcome, operation, current, previous);
        break;

      case "DEL":
        this.processDelete();
        break;
      case "CE":
        this.processClearEntry();
        break;
      case "C":
        this.processClear();
        break;
      case "=":
        this.processEqual();
        break;

      default:
        return;
    }
  }

  updateDisplay(outcome = null, operation = null, current = null, previous = null) {
    if (outcome === null) {
      this.currentText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        outcome = current;
      }
      this.previousText.innerText = `${outcome} ${operation}`;
      this.currentText.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["+", "-", "*", "/"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousText.innerText = this.previousText.innerText.slice(0, -1) + operation;
  }

  processDelete() {
    this.currentText.innerText = this.currentText.innerText.slice(0, -1);
  }

  processClearEntry() {
    this.currentText.innerText = "";
  }

  processClear() {
    this.currentText.innerText = "";
    this.previousText.innerText = "";
  }

  processEqual() {
    let operation = this.previousText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousText, currentText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addNumber(value);
    } else {
      calc.processOperation(value);
    }
  });
});
