const form = document.getElementById('cadastroFormEtapa1');
const modal = document.getElementById('modalRedirecionamento');

function mostrarModal(){
    modal.style.display = 'flex';
}

function redirecionarPagina(){
    window.location.replace("../login.html")
}

form.addEventListener('submit',function (event){
    event.preventDefault();

    mostrarModal();
})

