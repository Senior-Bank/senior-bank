document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleciona o slider e o elemento de texto que exibirá o valor
    const limiteRange = document.getElementById('limite-range');
    const valorAtualDisplay = document.getElementById('valor-atual');

    // Função para formatar o valor como moeda brasileira
    function formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(valor);
    }

    // 2. Define o valor inicial assim que a página carrega
    valorAtualDisplay.textContent = formatarValor(limiteRange.value);

    // 3. Adiciona um "listener" (ouvinte) para o evento 'input'
    // O evento 'input' é disparado continuamente enquanto o usuário arrasta
    limiteRange.addEventListener('input', function() {
        // Atualiza o texto com o novo valor do slider (já formatado)
        valorAtualDisplay.textContent = formatarValor(this.value);
    });
});