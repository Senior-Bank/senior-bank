
const btnConfirmarPagamento = document.querySelector('.confirmar-pagamento');
const popup = document.querySelector('.box-seguranca');
const fechar = document.querySelector('.img-x');
const btncancelar = document.getElementById('cancelarModal');
const btnFinalizarPagamento = document.getElementById('confirmar');
const verMaisContas = document.querySelector('.verMais')
const divContas = document.querySelector('.contas');
const popupPagamentofeito = document.querySelector('.pagamento-feito');
const formConfirmarPagamento = document.querySelector('.itens');




function abrirPopup() {
        popup.style.display = 'block';   
        
};

function fecharPopup() {
         popup.style.display = 'none'  

         if( formConfirmarPagamento){
                formConfirmarPagamento.reset();
         }
}


function verContas(){
                
        const div = document.createElement('div');
        div.classList.add('conta')
        div.innerHTML= ` 
        <img src="./img-pagarContas/luz.svg" alt="icon de casa" div="img-luz">

        <div class="container-textoInfo-contas">
          <h1>Conta de telefone</h1>
          <h2>Vencimento: 28/11/2025</h2>
        </div>

        <div class="valor">
          <P>R$100,00</P>
        </div>

        <input type="checkbox" class="check">

        `
        divContas.appendChild(div)
         
}


btnConfirmarPagamento.addEventListener('click',  abrirPopup);

fechar.addEventListener('click', fecharPopup);

btncancelar.addEventListener('click', fecharPopup);

verMaisContas.addEventListener('click', verContas);













