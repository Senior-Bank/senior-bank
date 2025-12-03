const pixEnviar = document.getElementById('btn-seta');
const popup = document.getElementById('modal-confirmacao');
const btnConfirmar = document.getElementById('btn-confirmar');
const btnCancelar = document.getElementById('btn-cancelar');

function abrirPopup() { 
    popup.style.display = 'block';
    console.log('1')
};

function fecharPopup() {
    popup.style.display = 'none'; 
    console.log('1')
};


pixEnviar.addEventListener('click',  abrirPopup);
btnCancelar.addEventListener('click', fecharPopup);

