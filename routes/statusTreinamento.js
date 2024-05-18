// routes/statusTreinamento.js
const express = require('express');
const router = express.Router();
const statusTreinamentoRepository = require('../repositories/statusTreinamentoRepository');

// GET: Listar todos os status de treinamento
router.get('/', async (req, res) => {
  try {
    const status = await statusTreinamentoRepository.getAll();
    res.json(status);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um status de treinamento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const status = await statusTreinamentoRepository.getById(id);
    res.json(status);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo status de treinamento
router.post('/', async (req, res) => {
  try {
    await statusTreinamentoRepository.create(req.body);
    res.status(201).send({ message: 'Status de treinamento criado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um status de treinamento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await statusTreinamentoRepository.update(id, req.body);
    res.send({ message: 'Status de treinamento atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um status de treinamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await statusTreinamentoRepository.delete(id);
    res.send({ message: 'Status de treinamento deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
