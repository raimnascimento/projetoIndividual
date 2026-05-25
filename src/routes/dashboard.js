var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de dashboardController.js
router.post("/registrarAcesso", function (req, res) {
    dashboardController.registrarAcesso(req, res);
});

router.get("/buscarAcessos", function (req, res) {
    dashboardController.buscarAcessos(req, res);
});

router.get("/buscarKpis/:idUsuario", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.get("/buscarTecnicas/:idUsuario", function (req, res) {
    dashboardController.buscarTecnicas(req, res);
});

module.exports = router;