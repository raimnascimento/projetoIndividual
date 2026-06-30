var database = require("../database/config");

function registrarAcesso(idUsuario) {
  var instrucaoSql = `
        INSERT INTO acesso (fkUsuario) VALUES (${idUsuario});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarAcessosGrafico() {
    var instrucaoSql = `
        SELECT qtd, dia FROM (
            SELECT COUNT(*) AS qtd, DATE_FORMAT(data_acesso, '%d/%m') AS dia, MIN(data_acesso) AS ordem
            FROM acesso 
            GROUP BY DATE_FORMAT(data_acesso, '%d/%m')
            ORDER BY ordem DESC
            LIMIT 7
        ) AS subquery
        ORDER BY ordem ASC;
    `;
    console.log("Executando a instrução SQL com inversão de ordem: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAcessosHoje() {
    var instrucaoSql = `
        SELECT COUNT(*) AS totalAcessos FROM acesso 
        WHERE DATE(data_acesso) = CURRENT_DATE();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaTreino() {
    var instrucaoSql = `
        SELECT IFNULL(ROUND(AVG(tempoTreino), 0), 0) AS mediaTreino FROM registrosDiario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTecnicaFavorita(idUsuario) {
    var instrucaoSql = `
        SELECT tecnica FROM registrosDiario
        WHERE fkUsuario = ${idUsuario}
        GROUP BY tecnica
        ORDER BY COUNT(tecnica) DESC
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTecnicas(idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n \n\t\t >> Se aqui der erro de'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT tecnica, quantidade FROM vw_dashTecnica
            WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
  registrarAcesso,
  buscarAcessosGrafico,
  buscarAcessosHoje,
  buscarMediaTreino,
  buscarTecnicaFavorita,
  buscarTecnicas
};
