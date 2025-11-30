<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recebe dados</title>
</head>
<body>
    <?php

    $conexao = mysqli_connect("localhost","root","","usuarios");

    if(!$conexao){
        echo"NÃO CONECTADO";
    }
     echo"CONECTADO AO BANCO>>>>>>>>";


     $cpf = $_POST['cpf'];
     $cpf = mysqli_real_escape_string($conexao, $cpf);
     $sql = "SELECT cpf FROM usuarios.dados WHERE cpf = '$cpf'";
     $retorno = mysqli_query($conexao, $sql);

    if(mysqli_num_rows($retorno)>0){ 
        echo "CPF já cadastrado!<br>";
    } else {
        $nome = $_POST ['nome'];
        $telefone = $_POST ['telefone'];
        $email = $_POST ['email'];
        $cpf = $_POST ['cpf'];
        $dataNascimento = $_POST ['dataNascimento'];

        $sql = "INSERT INTO usuarios.dados(nome,telefone,email,cpf,dataNascimento) values('$nome','$telefone','$email','$cpf','$dataNascimento')";
        $resultado = mysqli_query ($conexao, $sql);
        echo ">>> Usuario cadastrado com sucesso!<br>";
    }




?>
</body>
</html>