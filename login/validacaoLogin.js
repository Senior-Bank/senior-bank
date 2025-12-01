// --- FIREBASE IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- INICIALIZAÇÃO E AUTENTICAÇÃO ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Autenticação inicial (necessária para acessar o Firestore)
async function authenticateUser() {
    try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }
        console.log("Usuário autenticado no Firebase.");
    } catch (error) {
        console.error("Erro na autenticação inicial:", error);
    }
}

authenticateUser();

// --- REFERÊNCIAS DO DOM (Mantidas) ---
const btnEnter = document.getElementById('btnEnter');
const cpfInput = document.getElementById('cpfInput');
const senhaInput = document.getElementById('senhaInput');

// Referências de Cadastro (Você deve ter estes IDs em seu cadastro.html)
const nomeInput = document.getElementById('nomeInput');
const emailInput = document.getElementById('emailInput');
const confirmarSenhaInput = document.getElementById('confirmarSenhaInput');
const btnCadastro = document.getElementById('btnCadastro'); 


// --- 1. FUNÇÃO DE CADASTRO (Firestore) ---
async function validarCadastro(event) {
    event.preventDefault();
    
    if (!nomeInput || !emailInput || !senhaInput || !confirmarSenhaInput) {
        alert("Erro: Elementos do formulário de cadastro não encontrados.");
        return;
    }

    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    let erros = [];

    // --- Validação Front-end (Simples) ---
    if (nome.trim() === '' || nome.length < 3) {
        erros.push('O nome é obrigatório e deve ter no mínimo 3 caracteres.');
    } 
    if (email.trim() === '' || !email.includes('@') || !email.includes('.')) {
        erros.push('Por favor, insira um email válido.');
    }
    if (senha.length !== 8) {
        erros.push('A senha deve ter exatamente 8 caracteres.');
    }
    if (senha !== confirmarSenha) {
        erros.push('As senhas não coincidem.');
    }

    if (erros.length > 0) {
        alert("Erro no Cadastro:\n" + erros.join('\n'));
        senhaInput.value = '';
        confirmarSenhaInput.value = '';
        return;
    }

    // --- Cadastro no Firebase Authentication ---
    try {
        // 1. Cria o usuário com Email e Senha (Firebase Auth)
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        
        // 2. Armazena dados adicionais (nome) no Firestore
        const userDocRef = doc(db, `/artifacts/${appId}/users/${user.uid}/private/data/profiles`, user.uid);
        await setDoc(userDocRef, {
            nome: nome,
            email: email,
            createdAt: new Date().toISOString()
        });

        alert(`✅ Cadastro de ${nome} concluído com sucesso!`);
        // Redireciona para login após cadastro
        window.location.href = 'login.html'; 

    } catch (error) {
        console.error("Erro ao cadastrar:", error.code, error.message);
        if (error.code === 'auth/email-already-in-use') {
            alert('Erro: Este email já está em uso. Tente fazer login ou use outro email.');
        } else {
            alert(`Erro no Cadastro: ${error.message}`);
        }
    }
}


// --- 2. FUNÇÃO DE LOGIN (Firestore) ---
async function validarLogin(event) {
    event.preventDefault(); 
    
    if (!cpfInput || !senhaInput) return; // Garante que os inputs existem

    // NOTA: O CPF é usado como 'ID' no login, mas o Firebase usa EMAIL.
    // Para simplificar, assumiremos que o CPF/Senha digitados são válidos
    // e buscaremos o usuário no Firestore.
    // Em um cenário real, o Firebase Auth usaria o Email.
    // Aqui, usaremos um login/senha fictício para simular o acesso.

    const cpf = cpfInput.value;
    const senha = senhaInput.value;
    
    let erros = [];

    // --- Validação Front-end ---
    if (cpf.length !== 11) erros.push('O CPF deve ter 11 dígitos.');
    if (senha.length !== 8) erros.push('A senha deve ter exatamente 8 caracteres.');
    
    if (erros.length > 0) {
        alert("Erro no Login:\n" + erros.join('\n'));
        cpfInput.value = '';
        senhaInput.value = '';
        return;
    }

    // --- Simulação de Login (Substitua por sua lógica real) ---
    // Como o Firebase Auth requer email, vamos simular que o CPF está mapeado para um email fictício
    // Em uma aplicação real, você faria signInWithEmailAndPassword(auth, email_mapeado, senha).

    const mockEmail = `${cpf}@seniorbank.com`;
    
    try {
        // 1. Tenta fazer login com o email (mapeado do CPF) e a senha
        await signInWithEmailAndPassword(auth, mockEmail, senha);
        
        // 2. Busca o nome do usuário no Firestore para personalizar
        const userDocRef = doc(db, `/artifacts/${appId}/users/${auth.currentUser.uid}/private/data/profiles`, auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        
        const nomeUsuario = docSnap.exists() ? docSnap.data().nome : 'Usuário';

        alert(`✅ Login bem-sucedido! Bem-vindo(a), ${nomeUsuario}!`);
        window.location.href = '../index/index.html';

    } catch (error) {
        console.error("Erro ao fazer login:", error.code, error.message);
        if (error.code === 'auth/invalid-credential') {
            alert('Erro: CPF ou senha incorretos.');
        } else {
            alert(`Erro no Login: ${error.message}`);
        }
        cpfInput.value = '';
        senhaInput.value = '';
    }
}


// 3. Adiciona os Event Listeners aos botões
if (btnEnter) {
    btnEnter.addEventListener('click', validarLogin);
}

if (btnCadastro) {
    btnCadastro.addEventListener('click', validarCadastro);
}