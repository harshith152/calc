document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function resetCalculator() {
        currentInput = '';
        previousInput = '';
        operation = null;
        display.textContent = '0';
    }

    function deleteLastChar() {
        currentInput = currentInput.toString().slice(0, -1);
        display.textContent = currentInput || '0';
    }

    function inputDigit(digit) {
        if (currentInput === '0' && digit === '0') return;
        if (currentInput === '0') {
            currentInput = digit;
        } else {
            currentInput += digit;
        }
        display.textContent = currentInput;
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        display.textContent = currentInput;
    }

    function setOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
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
                if (current === 0) {
                    alert('Division by zero!');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result;
        operation = null;
        previousInput = '';
        display.textContent = currentInput;
    }

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            const value = button.textContent;

            if (type === 'num') {
                inputDigit(value);
            } else if (type === 'op') {
                setOperation(value);
            } else if (type === 'decimal') {
                inputDecimal();
            } else if (type === 'delete') {
                deleteLastChar();
            } else if (type === 'reset') {
                resetCalculator();
            } else if (type === 'equal') {
                calculate();
            }
        });
    });
});
