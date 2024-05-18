// routes/agendarTreinamento.js
const express = require('express');
const router = express.Router();
const agendarTreinamentoRepository = require('../repositories/agendarTreinamentoRepository');

// GET: Listar todos os agendamentos de treinamento
router.get('/', async (req, res) => {
  try {
    const treinamentos = await agendarTreinamentoRepository.getAll();
    res.json(treinamentos);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um agendamento de treinamento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const treinamento = await agendarTreinamentoRepository.getById(id);
    res.json(treinamento);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo agendamento de treinamento
router.post('/', async (req, res) => {
  try {
    await agendarTreinamentoRepository.create(req.body);
    res.status(201).send({ message: 'Treinamento agendado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um agendamento de treinamento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await agendarTreinamentoRepository.update(id, req.body);
    res.send({ message: 'Treinamento atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um agendamento de treinamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await agendarTreinamentoRepository.delete(id);
    res.send({ message: 'Treinamento deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;