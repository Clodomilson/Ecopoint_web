const db = require('../models/db');

exports.listarPontos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pontos_coleta');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.adicionarPonto = async (req, res) => {
  const { nome, latitude, longitude } = req.body;
  try {
    await db.query(
      'INSERT INTO pontos_coleta (nome, latitude, longitude) VALUES ($1, $2, $3)',
      [nome, latitude, longitude]
    );
    res.status(201).json({ mensagem: 'Ponto de coleta cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
