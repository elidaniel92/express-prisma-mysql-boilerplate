CREATE DATABASE IF NOT EXISTS psic_sys;
USE psic_sys;

CREATE TABLE IF NOT EXISTS Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    dataNascimento DATE NOT NULL,
    cpf CHAR(11) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    contatoEmergencia VARCHAR(255) NOT NULL,
    telefoneEmergencia VARCHAR(15) NOT NULL
    cadastro CHAR(7) NOT NULL
);
