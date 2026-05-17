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
nome VARCHAR(100),
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

CREATE TABLE tecnica (
id INT PRIMARY KEY AUTO_INCREMENT,
nomeTecnica VARCHAR(20)
);

CREATE TABLE obraTecnica (
idObraTecnica INT AUTO_INCREMENT,
idObra INT,
idTecnica INT,
dataAplicacao DATE,
tempoGasto INT,
CONSTRAINT PRIMARY KEY (idObraTecnica, idObra, idTecnica),
CONSTRAINT fkObra FOREIGN KEY (idObra) REFERENCES obra(id),
CONSTRAINT fkTecnica FOREIGN KEY (idTecnica) REFERENCES tecnica(id)
);

-- A ideia é fazer com que a cada login, faça um insert automático nessa tabela para depois possívelmente usar na Dashboard
CREATE TABLE acesso (
    id INT AUTO_INCREMENT,
    fkUsuario INT,
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PRIMARY KEY (id, fkUsuario),
    CONSTRAINT fkAcessoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

SELECT * FROM acesso;

INSERT INTO acesso (id, data_acesso, fkUsuario) VALUES 
(1, '2026-05-06 10:30:00', 1), 
(1, '2026-05-06 14:15:00', 2), 
(1, '2026-05-07 09:00:00', 3), 
(2, '2026-05-07 11:20:00', 1), 
(1, '2026-05-07 16:45:00', 4),
(1, '2026-05-08 13:10:00', 5),
(2, '2026-05-08 18:00:00', 2), 
(1, '2026-05-09 10:00:00', 7),
(1, '2026-05-09 15:30:00', 6),
(3, '2026-05-09 20:00:00', 1),
(2, '2026-05-10 08:30:00', 5),
(3, '2026-05-10 11:00:00', 2);

INSERT INTO autor (nome, tipoAutor) VALUES
('Raissa Nascimento', 'Proprietário'),
('Geovana Rodrigues', 'Família'),
('Nicolly Freire', 'Família'),
('Victor Hugo', 'Família');

-- Ainda não pedi autorização, só tem obras minhas inseridas aqui, obras também mockadas por enquanto
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

INSERT INTO tecnica (nomeTecnica) VALUES
('Aquarela'),
('Guache'),
('Aquarela e Guache');

INSERT INTO obraTecnica (idObra, idTecnica, dataAplicacao, tempoGasto) VALUES
(1, 1, '2026-05-01', 4), 
(1, 2, '2026-05-02', 2), 
(2, 2, '2026-05-03', 5), 
(3, 1, '2026-05-04', 3), 
(4, 1, '2026-05-05', 2), 
(5, 3, '2026-05-06', 6), 
(6, 1, '2026-05-07', 3), 
(7, 2, '2026-05-08', 7), 
(8, 1, '2026-05-09', 4), 
(9, 2, '2026-05-10', 5);

-- selects para entender se está fazendo sentido
SELECT titulo AS Título, descricao AS Descrição, nome AS Autor, tipoAutor AS 'Tipo de Autor' FROM obra AS o
	JOIN autor AS a ON o.fkAutor = a.id;

SELECT titulo AS Título, descricao AS Descrição, nome AS Autor, CASE 
WHEN tipoAutor = 'Proprietário' THEN 'Eu sou a dona dessa obra'
ELSE 'Alguém da minha família pintou isso'
END AS 'Origem da obra'
FROM obra AS o
	JOIN autor AS a ON o.fkAutor = a.id;
    
SELECT o.titulo AS 'Título da Obra', t.nomeTecnica AS 'Técnica Utilizada', ot.dataAplicacao AS 'Data de Aplicação', ot.tempoGasto AS 'Tempo Gasto (Horas)' FROM obraTecnica AS ot
	JOIN obra AS o ON ot.idObra = o.id
		JOIN tecnica AS t ON ot.idTecnica = t.id;
    
SELECT * FROM usuario;