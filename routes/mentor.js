// routes/mentor.js
const express = require('express');
const router = express.Router();
const mentorRepository = require('../repositories/mentorRepository');

// GET: Listar todos os mentores
router.get('/', async (req, res) => {
  try {
    const mentores = await mentorRepository.getAll();
    res.json(mentores);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um mentor por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mentor = await mentorRepository.getById(id);
    res.json(mentor);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo mentor
router.post('/', async (req, res) => {
  try {
    await mentorRepository.create(req.body);
    res.status(201).send({ message: 'Mentor criado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um mentor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await mentorRepository.update(id, req.body);
    res.send({ message: 'Mentor atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um mentor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await mentorRepository.delete(id);
    res.send({ message: 'Mentor deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post('/virarMentor/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { isActive } = req.body; // Expecting a boolean value in the request body

  if (typeof isActive !== 'boolean') {
    return res.status(400).send('Invalid isActive value');
  }

  try {
    await mentorRepo.virarMentor(userId, isActive);
    res.status(200).send('User mentor status updated successfully');
  } catch (error) {
    console.error('Error in virarMentor route:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
