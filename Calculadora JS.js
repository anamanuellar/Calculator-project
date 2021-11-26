//Prática a partir do tutorial: https://freshman.tech/calculator/
//Função básica para funcionamento da calculadora

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

// Função que adiciona os numeros no visor
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; //o operador ternário ( ?) é usado para verificar se o valor atual exibido na calculadora é zero. Nesse caso, calculator.displayValue é sobrescrito com qualquer dígito que foi clicado. Caso contrário, se displayValue for um número diferente de zero, o dígito é anexado a ele por meio de concatenação de string.
  }

}

// Função para colocar o ponto decimal
function inputDecimal(dot) {

  if (calculator.waitingForSecondOperand === true) {

    calculator.displayValue = '0.'

    calculator.waitingForSecondOperand = false;

    return

  }


  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }//o método includes() é usado para verificar se displayValue ainda não contém uma vírgula decimal. Nesse caso, um ponto é acrescentado ao número. Caso contrário, a função é encerrada.
}


function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;

  } else if (operator) {

    const result = calculate(firstOperand, inputValue, operator);



    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;


    calculator.firstOperand = result;

  }


  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

}

// Função que executa as operações básicas da calculadora
function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}
// Função que limpa o visor
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;

}

//Atualizar display//

function updateDisplay() {
  // selecionar o elemento com a classe `calculadora-tela`
  const display = document.querySelector('.calculadora-tela');
  // atualizar o valor do elemento como conteúdo do `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();
//Retorno de ação ao clicar nas teclas//
const keys = document.querySelector('.calculadora-chave');
keys.addEventListener('click', (event) => {
  // Acessar o elemento clicado
  const { target } = event; //A target variável é um objeto que representa o elemento que foi clicado
  // Checar se o elemento é um botão.
  // Se não, sair da função
  const { value } = target;

  if (!target.matches('button')) {
    return;
  }



  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'limpar':
      resetCalculator();
      break;
    default:
      // verificar se o resultado é inteiro
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
