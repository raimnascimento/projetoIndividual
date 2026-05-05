CREATE DATABASE projetoIndividual;
USE projetoIndividual;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
senha VARCHAR(50) NOT NULL,
contatoArte CHAR(3) NOT NULL,
CONSTRAINT chkContatoArte CHECK(contatoArte IN('Sim', 'Não'))
);

CREATE TABLE autor (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
tipoAutor VARCHAR(20),
CONSTRAINT fkAutorTipo CHECK(tipoAutor IN('Proprietário', 'Família'))
);

CREATE TABLE obra (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100),
descricao VARCHAR(150),
imagem VARCHAR(255),
fkAutor INT,
CONSTRAINT fkObraAutor FOREIGN KEY (fkAutor) REFERENCES autor(id)
);

-- A ideia é fazer com que a cada login, faça um insert automático nessa tabela para depois possívelmente usar na Dashboard
CREATE TABLE acesso (
id INT PRIMARY KEY AUTO_INCREMENT,
data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO autor (nome, tipoAutor) VALUES
('Raissa Nascimento', 'Proprietário'),
('Geovana Rodrigues', 'Família'),
('Nicolly Freire', 'Família'),
('Victor Hugo', 'Família');

-- Ainda não pedi autorização, só tem obras minhas inseridas aqui
INSERT INTO obra (titulo, descricao, imagem, fkAutor) VALUES
('Flores na janela', 'Uma janela em fundo rosado com flores vermelhas na base', 'flores1.jpg', 1),
('Casa entre o verde', 'Uma pequena casa com telhado alaranjado cercada por árvores e folhas, no meio de uma paisagem natural.', 'janela2.jpg', 1),
('Paisagem tranquila', 'Um campo aberto com céu leve e calmo', 'paisagem1.jpg', 1),
('Céu em aquarela', 'Cores diluídas formando um céu suave', 'ceu1.jpg', 1),
('Fim de tarde', 'O céu mudando de cor lentamente', 'entardecer1.jpg', 1),
('Flores delicadas', 'Pinceladas leves tentando capturar o movimento', 'flores2.jpg', 1),
('Silêncio do entardecer', 'Árvores escuras com um céu que traz a sensação de calma antes da noite chegar.', 'montanha1.jpg', 1),
('Campo com flores', 'Pequenas flores espalhadas em um campo aberto', 'campo1.jpg', 1),
('Céu verde em degradê', 'Floresta de pinheiros escuros com um céu em degradê de verde, com pássaros ao fundo atravessando.', 'janela3.jpg', 1);

-- selects para entender se está fazendo sentido
SELECT titulo AS Título, descricao AS Descrição, nome AS Autor, tipoAutor AS 'Tipo de Autor' FROM obra AS o
	JOIN autor AS a ON o.fkAutor = a.id;

SELECT titulo AS Título, descricao AS Descrição, nome AS Autor, CASE 
WHEN tipoAutor = 'Proprietário' THEN 'Eu sou a dona dessa obra'
ELSE 'Alguém da minha família pintou isso'
END AS 'Origem da obra'
FROM obra AS o
	JOIN autor AS a ON o.fkAutor = a.id;