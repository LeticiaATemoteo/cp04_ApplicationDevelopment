const inputPotencia = document.getElementById('potencia');
const inputHoras = document.getElementById('horas');
const inputDias = document.getElementById('dias');

const btnCalcular = document.getElementById('btn-calcular');
const btnLimpar = document.getElementById('btn-limpar');
const btnTema = document.getElementById('btn-tema'); // Botão de tema adicionado

const areaResultado = document.getElementById('area-resultado');
const areaErro = document.getElementById('area-erro');
const textoConsumo = document.getElementById('texto-consumo');
const textoClassificacao = document.getElementById('texto-classificacao');

function alternarTema() {
    document.body.classList.toggle('modo-escuro');
    
    if (document.body.classList.contains('modo-escuro')) {
        btnTema.textContent = '☀️ Modo Claro';
    } else {
        btnTema.textContent = '🌙 Modo Escuro';
    }
}

function calcular(evento) {
    evento.preventDefault();

    const potencia = parseFloat(inputPotencia.value);
    const horas = parseFloat(inputHoras.value);
    const dias = parseFloat(inputDias.value);

    if (
        isNaN(potencia) || isNaN(horas) || isNaN(dias) || 
        potencia <= 0 || horas <= 0 || dias <= 0 || 
        horas > 24 || dias > 31
    ) {
        areaResultado.className = 'escondido';
        areaErro.classList.remove('escondido');
        return; 
    }

    areaErro.classList.add('escondido');

    const consumoKwh = (potencia * horas * dias) / 1000;
    let classificacao = '';
    let classeVisual = '';

    if (consumoKwh <= 30) {
        classificacao = 'Consumo Baixo';
        classeVisual = 'consumo-baixo';
    } else if (consumoKwh <= 100) {
        classificacao = 'Consumo Moderado';
        classeVisual = 'consumo-moderado';
    } else if (consumoKwh <= 200) {
        classificacao = 'Consumo Alto';
        classeVisual = 'consumo-alto';
    } else {
        classificacao = 'Consumo Muito Alto';
        classeVisual = 'consumo-muito-alto';
    }

    textoConsumo.textContent = `Consumo mensal: ${consumoKwh.toFixed(2)} kWh`;
    textoClassificacao.textContent = `Classificação: ${classificacao}`;

    areaResultado.className = ''; 
    areaResultado.classList.add(classeVisual);
}

function limpar(evento) {
    evento.preventDefault();
    inputPotencia.value = '';
    inputHoras.value = '';
    inputDias.value = '';
    areaResultado.className = 'escondido';
    areaErro.className = 'escondido';
}

btnCalcular.addEventListener('click', calcular);
btnLimpar.addEventListener('click', limpar);
btnTema.addEventListener('click', alternarTema); // Evento do novo botão