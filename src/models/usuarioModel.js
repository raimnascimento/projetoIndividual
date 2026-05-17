var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, contatoArte) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
    contatoArte,
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, contatoArte) VALUES ('${nome}', '${email}', '${senha}', '${contatoArte}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function registrarAcesso(idUsuario) {
  var instrucaoSql = `
        INSERT INTO acesso (fkUsuario) VALUES (${idUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAcessosGrafico() {
  var instrucaoSql = `
        SELECT count(*) as qtd, DATE_FORMAT(data_acesso, '%d/%m') as dia 
        FROM acesso 
        GROUP BY dia 
        ORDER BY dia ASC LIMIT 7;
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
  registrarAcesso,
  buscarAcessosGrafico,
};
