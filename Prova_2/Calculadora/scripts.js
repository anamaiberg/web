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
    if (number === "." && this.currentText.innerText.includes(".")) {
      return;
    }
    this.currentText.innerText += number;
  }

  processOperation(operation) {
    if (operation === "DEL") {
      this.processDelete();
    } else if (operation === "CE") {
      this.processClearEntry();
    } else if (operation === "C") {
      this.processClear();
    } else if (operation === "=") {
      this.processEqual();
    } else {
      this.addOperation(operation);
    }
  }

  addOperation(operation) {
    const mathOperations = ["+", "-", "*", "/"];
    if (mathOperations.includes(operation) && this.currentText.innerText !== "") {
      this.currentText.innerText += ` ${operation} `;
    }
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
    const expression = this.currentText.innerText.trim();

    if (this.validateExpression(expression)) {
      try {
        const result = eval(expression);
        this.previousText.innerText = expression;
        this.currentText.innerText = result;
      } catch {
        this.currentText.innerText = "Erro";
      }
    } else {
      this.currentText.innerText = "Entrada Inválida";
    }
  }

  validateExpression(expression) {
    const validChars = /^[0-9+\-*/.\s]+$/;
    return validChars.test(expression);
  }
}

const calc = new Calculator(previousText, currentText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (!isNaN(value) || value === ".") {
      calc.addNumber(value);
    } else {
      calc.processOperation(value);
    }
  });
});
