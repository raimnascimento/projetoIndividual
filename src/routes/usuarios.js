var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/registrarAcesso", function (req, res) {
    usuarioController.registrarAcesso(req, res);
});

router.get("/buscarAcessos", function (req, res) {
    usuarioController.buscarAcessos(req, res);
});

router.get("/buscarKpis/:idUsuario", function (req, res) {
    usuarioController.buscarKpis(req, res);
});

router.get("/buscarTecnicas/:idUsuario", function (req, res) {
    usuarioController.buscarTecnicas(req, res);
});

module.exports = router;