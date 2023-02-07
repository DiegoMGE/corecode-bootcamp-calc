class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.op = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(op) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.op = op;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return

        switch (this.op) {
            case '+': 
                result = prev + current;
                break;
            case '-': 
                result = prev - current;
                break;
            case '*': 
                result = prev * current;
                break;
            case '/': 
                result = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = result;
        this.op = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]); // numbers before the decimal
        const decimalDigits = stringNumber.split('.')[1]; // numbers after the decimal
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.getDisplayNumber(this.currentOperand);
        if (this.op != null) {
            this.previousOperandTextElement.innerHTML = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.op}`;
        } else {
            this.previousOperandTextElement.innerHTML = '';
        }
    }
}

const numberButtons = document.querySelectorAll('#data-number');
const operationButtons = document.querySelectorAll('#data-operation');
const equalsButton = document.querySelector('#data-equals');
const deleteButton = document.querySelector('#data-delete');
const allClearButton = document.querySelector('#data-all-clear');
const previousOperandTextElement = document.querySelector('#data-previous-operand');
const currentOperandTextElement = document.querySelector('#data-current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) 

numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerHTML);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerHTML);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', (btn) => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', (btn) => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', (btn) => {
    calculator.delete();
    calculator.updateDisplay();
});
