// routes/statusMentoria.js
const express = require('express');
const router = express.Router();
const statusMentoriaRepository = require('../repositories/statusMentoriaRepository');

// GET: Listar todos os status de mentoria
router.get('/', async (req, res) => {
  try {
    const status = await statusMentoriaRepository.getAll();
    res.json(status);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um status de mentoria por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const status = await statusMentoriaRepository.getById(id);
    res.json(status);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo status de mentoria
router.post('/', async (req, res) => {
  try {
    await statusMentoriaRepository.create(req.body);
    res.status(201).send({ message: 'Status de mentoria criado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um status de mentoria
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await statusMentoriaRepository.update(id, req.body);
    res.send({ message: 'Status de mentoria atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um status de mentoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await statusMentoriaRepository.delete(id);
    res.send({ message: 'Status de mentoria deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
