var database = require("../database/config");

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
            d.id AS idAviso, d.tecnica, d.tempoTreino, d.anotacoes, d.fkUsuario, DATE_FORMAT(d.dataRegistro, '%d/%m/%Y às %H:%i') AS dataRegistroFormatada, u.id AS idUsuario, u.nome, u.email FROM registrosDiario d
                JOIN usuario u ON d.fkUsuario = u.id
                    WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(tecnica, tempoTreino, anotacoes, idUsuario) {
    console.log("ACESSEI O DIARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", tecnica, tempoTreino, anotacoes, idUsuario);
    var instrucaoSql = `
        INSERT INTO registrosDiario (tecnica, tempoTreino, anotacoes, fkUsuario) VALUES ('${tecnica}', ${Number(tempoTreino)}, '${anotacoes}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorUsuario,
    publicar
}
