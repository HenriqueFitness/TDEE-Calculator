function calcularTdee(peso, altura, idade, genero, nivelAtividade) {
    let tdee;
    if (genero === 'M') {
        tdee = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
        tdee = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }
    
    const niveisAtividade = {
        'sedentario': 1.2,
        'ligeiramente_ativo': 1.375,
        'moderadamente_ativo': 1.55,
        'altamente_ativo': 1.725,
        'extremamente_ativo': 1.9,
    };

    return tdee * niveisAtividade[nivelAtividade];
}

function calcularMacros(tdee) {
    const caloriasParaPerder = tdee * 0.8;
    const proteinas = caloriasParaPerder * 0.3 / 4;
    const gorduras = caloriasParaPerder * 0.25 / 9;
    const carboidratos = caloriasParaPerder * 0.45 / 4;

    return { proteinas, gorduras, carboidratos };
}

function dividirMacrosEmRefeicoes(macros) {
    const numRefeicoes = 4;
    return {
        proteinas: macros.proteinas / numRefeicoes,
        gorduras: macros.gorduras / numRefeicoes,
        carboidratos: macros.carboidratos / numRefeicoes,
    };
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const nivelAtividade = document.getElementById('nivel_atividade').value;

    const tdee = calcularTdee(peso, altura, idade, genero, nivelAtividade);
    const macros = calcularMacros(tdee);
    const macrosPorRefeicao = dividirMacrosEmRefeicoes(macros);

    const resultado = `
        TDEE: ${tdee.toFixed(2)} calorias por dia
        Proteínas por dia: ${macros.proteinas.toFixed(2)} g
        Gorduras por dia: ${macros.gorduras.toFixed(2)} g
        Carboidratos por dia: ${macros.carboidratos.toFixed(2)} g
        Proteínas por refeição: ${macrosPorRefeicao.proteinas.toFixed(2)} g
        Gorduras por refeição: ${macrosPorRefeicao.gorduras.toFixed(2)} g
        Carboidratos por refeição: ${macrosPorRefeicao.carboidratos.toFixed(2)} g
    `;

    document.getElementById('resultado').innerText = resultado;
});
