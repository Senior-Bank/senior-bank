
const btnConfirmarPagamento = document.querySelector('.confirmar-pagamento');
const popup = document.querySelector('.box-seguranca');
const fechar = document.querySelector('.img-x');
const body = document.getElementById('body');



function abrirPopup() {
        popup.style.display = 'block';
       body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        console.log('Popup aberto!');

}

function fecharPopup() {
        popup.style.display = 'none'
        body.style.backgroundColor = 'white';



}

btnConfirmarPagamento.addEventListener('click',  abrirPopup);

fechar.addEventListener('click', fecharPopup)

