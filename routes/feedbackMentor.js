// routes/feedbackMentor.js
const express = require('express');
const router = express.Router();
const feedbackMentorRepository = require('../repositories/feedbackMentorRepository');

// GET: Listar todos os feedbacks de mentor
router.get('/', async (req, res) => {
  try {
    const feedbacks = await feedbackMentorRepository.getAll();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um feedback de mentor por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await feedbackMentorRepository.getById(id);
    res.json(feedback);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo feedback de mentor
router.post('/', async (req, res) => {
  try {
    await feedbackMentorRepository.create(req.body);
    res.status(201).send({ message: 'Feedback de mentor criado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um feedback de mentor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await feedbackMentorRepository.update(id, req.body);
    res.send({ message: 'Feedback de mentor atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um feedback de mentor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await feedbackMentorRepository.delete(id);
    res.send({ message: 'Feedback de mentor deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
