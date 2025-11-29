   const divLimite = document.getElementById('box-limite');
   const btnLimite = document.getElementById('btn-limite');
   const btnFecharPopUp = document.querySelector('.div-x');
   const body = document.getElementById('body');
   const btnfechar = document.querySelector('.btn-confirmar')




document.addEventListener('DOMContentLoaded', function() {

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


function abrirBoxLimite(){
    divLimite.style.display = 'block';
     body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
     body.style.zIndex = '1000000';
}

function fecharPopup(){
    divLimite.style.display = 'none';
    body.style.backgroundColor = '#f1f1f1';

}

function confirmar(){
    divLimite.style.display = 'none';
    body.style.backgroundColor = '#f1f1f1';
    
}




btnLimite.addEventListener('click', abrirBoxLimite);

btnFecharPopUp.addEventListener('click', fecharPopup);

btnfechar.addEventListener('click', confirmar);