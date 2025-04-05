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
    telefoneEmergencia VARCHAR(15) NOT NULL,
    cadastro CHAR(7) NOT NULL
);

INSERT INTO Pacientes (nome, dataNascimento, cpf, telefone, email, endereco, contatoEmergencia, telefoneEmergencia, cadastro)
VALUES
('Ana Clara Silva', '1990-05-12', '12345678901', '(11) 91234-5678', 'ana.silva@example.com', 'Rua das Flores, 123 - São Paulo/SP', 'Marcos Silva', '(11) 99876-5432', 'ABC1234'),

('Bruno Costa Oliveira', '1985-11-23', '23456789012', '(21) 98877-6655', 'bruno.oliveira@example.com', 'Av. Atlântica, 456 - Rio de Janeiro/RJ', 'Paula Oliveira', '(21) 97654-3210', 'DEF5678'),

('Camila Souza Lima', '2000-02-17', '34567890123', '(31) 99777-8899', 'camila.lima@example.com', 'Rua da Paz, 789 - Belo Horizonte/MG', 'João Lima', '(31) 93456-7890', 'GHI9012'),

('Diego Martins Rocha', '1993-08-04', '45678901234', '(41) 96543-2109', 'diego.rocha@example.com', 'Rua XV de Novembro, 101 - Curitiba/PR', 'Fernanda Rocha', '(41) 91234-5678', 'JKL3456'),

('Eduarda Pereira Mendes', '1997-12-30', '56789012345', '(51) 98765-4321', 'eduarda.mendes@example.com', 'Av. Ipiranga, 202 - Porto Alegre/RS', 'Carlos Mendes', '(51) 99887-7766', 'MNO7890');