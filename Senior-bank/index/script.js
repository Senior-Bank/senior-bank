const saldo = document.getElementById('valor-saldo-p');
const btnVisualizar = document.querySelector('.visualizar');
const imagem = document.getElementById('iconeOlho'); 


function ocultarSaldo() {
    
    
    if (saldo.innerText.includes('*')) {
         saldo.innerText = 'R$54.785,15';
        imagem.src = 'images/olho-oculto.png'; 
        
    } else {
        saldo.innerText = 'R$ **********';
        imagem.src = 'images/olho-visivel.png';
    }
}

btnVisualizar.addEventListener('click', ocultarSaldo);
