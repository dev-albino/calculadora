let inputResultado = document.querySelector("#inputDisplayResultado");
let textAreaHistorico = document.querySelector("#textAreaHistorico");

let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
};

window.addEventListener("load", atribuirEventos);
/* Atribui eventos para os botões da calculadora */
function atribuirEventos() {
    document.querySelector("#btnLimpar").addEventListener("click", limparDados);
    document.querySelector("#btnPonto").addEventListener("click", clicarPonto);
    document.querySelector("#btnResultado").addEventListener("click", clicarResultado);

    let numeros = document.querySelectorAll(".btn-numero");
    let operadores = document.querySelectorAll(".btn-operador");

    for (let numero of numeros) {
        numero.addEventListener("click", clicarNumero);
    }

    for (let operador of operadores) {
        operador.addEventListener("click", clicarOperador);
    }
}

/* Remove os dados variáveis, faz uma separação no histórico e habilita os botões no caso de der erro pela divisão de 0 */
function limparDados() {
    inputResultado.value = "";
    inserirTextoHistorico("--------------------");

    calculo.funcaoParaCalcular = null;
    calculo.valorSalvo = null;

    desabilitar(false);
}

/* Função que é disparada ao clicar no ponto para adicionar números decimais */
function clicarPonto() {
    if (isNaN(inputResultado.value)) {
        inserirTextoHistorico(inputResultado.value);
    } else {
        if (inputResultado.value == "" || isNaN(inputResultado.value)) {
            inputResultado.value = "0.";
        } else if (!inputResultado.value.includes(".")) {
            inputResultado.value += ".";
        }
    }
}

/* Insere os números na calculadora */
function clicarNumero() {
    if (isNaN(inputResultado.value)) {
        inserirTextoHistorico(inputResultado.value);
        inputResultado.value = event.target.textContent;
    } else {
        if (inputResultado.value === "0") {
            inputResultado.value = event.target.textContent;
        } else {
            inputResultado.value += event.target.textContent;
        }
    }
}

/* Insere os operadores na calculadora */
function clicarOperador() {
    if (!isNaN(inputResultado.value)) {
        if (calculo.valorSalvo == null || calculo.funcaoParaCalcular == null) {
            calculo.valorSalvo = Number(inputResultado.value);
        } else {
            calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));
        }

        inserirTextoHistorico(calculo.valorSalvo);
    }

    let operador = event.target.textContent;
    atribuirOperador(operador);
    inputResultado.value = operador;
}

/* Chama a função correspondente ao operador passado */
function atribuirOperador(operador) {
    switch (operador){
        case "+": 
            calculo.funcaoParaCalcular = somar;
            break;
        case "-": 
            calculo.funcaoParaCalcular = subtrair;
            break;
        case "*": 
            calculo.funcaoParaCalcular = multiplicar;
            break;
        case "/": 
            calculo.funcaoParaCalcular = dividir;
            break;
    }
}

/* Exibe o resultado do cálculo */
function clicarResultado() {
    if (!isNaN(inputResultado.value && calculo.funcaoParaCalcular != null)) {
        let resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));

        inserirTextoHistorico(inputResultado.value + "\n= " + resultado);
        inputResultado.value = resultado;
        calculo.valorSalvo = resultado;
        calculo.funcaoParaCalcular = null;
    }
}

/* Soma dois valores */
function somar(v1, v2) {
    return v1 + v2;
}

/* Subtrai dois valores */
function subtrair(v1, v2) {
    return v1 - v2;
}

/* Multiplica dois valores */
function multiplicar(v1, v2) {
    return v1 * v2;
}

/* Dividi dois valores */
function dividir(v1, v2) {
    if (v2 == 0) {
        desabilitar(true);
        return "Erro de divisão por \"0\"";
    } else {
        return v1 / v2;
    }
}

/* Desabilita os botões após um erro de dividir algum valor por 0 */
function desabilitar(param) {
    let buttons = document.querySelectorAll(".btn");
    for (let button of buttons) {
        button.disabled = param;
    }
    document.querySelector("#btnLimpar").disabled = false;
}

/* Insere os textos e cálculos na sessão de histórico da calculadora */
function inserirTextoHistorico(texto) {
    textAreaHistorico.textContent += texto + "\n";
    textAreaHistorico.scrollTop = textAreaHistorico.scrollHeight;
}