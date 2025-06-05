const db = require('../firebase');

exports.listarPontos = async (req, res) => {
  try {
    const snapshot = await db.collection('pontos_coleta').get();
    const pontos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(pontos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.adicionarPonto = async (req, res) => {
  const { nome, latitude, longitude } = req.body;
  try {
    await db.collection('pontos_coleta').add({ nome, latitude, longitude });
    res.status(201).json({ mensagem: 'Ponto de coleta cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};