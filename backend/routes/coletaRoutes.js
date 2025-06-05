const express = require('express');
const router = express.Router();
const controller = require('../controllers/coletaController');

router.get('/', controller.listarPontos);
router.post('/', controller.adicionarPonto);

module.exports = router;
