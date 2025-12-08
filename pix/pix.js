const pixEnviar = document.getElementById('btn-seta');
const popup = document.getElementById('modal-confirmacao');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnCancelar = document.getElementById('btn-cancelar');

function abrirPopup() { 
    popup.style.display = 'block';
};

function fecharPopup() {
    popup.style.display = 'none'; 
};

function confirmacaoPix() {
    alert('Pagamento via Pix confirmado! Obrigado por sua compra.');
    fecharPopup();
}



btnConfirmar.addEventListener('click', confirmacaoPix);
pixEnviar.addEventListener('click',  abrirPopup);
btnCancelar.addEventListener('click', fecharPopup);

