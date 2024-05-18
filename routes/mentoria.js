// routes/mentoria.js
const express = require('express');
const router = express.Router();
const mentoriaRepository = require('../repositories/mentoriaRepository');

// GET: Listar todas as mentorias
router.get('/', async (req, res) => {
  try {
    const mentorias = await mentoriaRepository.getAll();
    res.json(mentorias);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter uma mentoria por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mentoria = await mentoriaRepository.getById(id);
    res.json(mentoria);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar uma nova mentoria
router.post('/', async (req, res) => {
  try {
    await mentoriaRepository.create(req.body);
    res.status(201).send({ message: 'Mentoria criada com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar uma mentoria
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await mentoriaRepository.update(id, req.body);
    res.send({ message: 'Mentoria atualizada com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar uma mentoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await mentoriaRepository.delete(id);
    res.send({ message: 'Mentoria deletada com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get('/getMentoriaByUserAndMentor/:userId/:mentorId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const mentorId = parseInt(req.params.mentorId, 10);

  if (isNaN(userId) || isNaN(mentorId)) {
    return res.status(400).send('Invalid userId or mentorId');
  }

  try {
    const mentoria = await mentoriaRepo.getMentoriaByUserAndMentor(userId, mentorId);
    if (!mentoria) {
      return res.status(404).send('Mentoria not found');
    }
    res.status(200).json(mentoria);
  } catch (error) {
    console.error('Error in getMentoriaByUserAndMentor route:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/escolherMentor', async (req, res) => {
  const { userId, mentorId } = req.body; // Expecting userId and mentorId in the request body

  if (!userId || !mentorId) {
    return res.status(400).send('userId and mentorId are required');
  }

  try {
    await mentoriaRepo.escolherMentor(userId, mentorId);
    res.status(200).send('Mentorship relationship created successfully');
  } catch (error) {
    console.error('Error in escolherMentor route:', error);
    if (error.message === 'Mentorship relationship already exists') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Internal server error');
    }
  }
});

router.post('/aceitarReprovarMentorado', async (req, res) => {
  const { userId, mentorId, status } = req.body; // Expecting userId, mentorId, and status in the request body

  if (!userId || !mentorId || !status) {
    return res.status(400).send('userId, mentorId, and status are required');
  }

  let statusMentoriaId;
  if (status === 'approved') {
    statusMentoriaId = 2; // Replace with the actual id for "approved" status
  } else if (status === 'rejected') {
    statusMentoriaId = 3; // Replace with the actual id for "rejected" status
  } else {
    return res.status(400).send('Invalid status value');
  }

  try {
    await mentoriaRepo.updateMentoriaStatus(userId, mentorId, statusMentoriaId);
    res.status(200).send(`Mentorship relationship ${status}`);
  } catch (error) {
    console.error('Error in aceitarReprovarMentorado route:', error);
    res.status(500).send('Internal server error');
  }
});

// Route to show mentorados of a mentor
router.get('/mostrarMentorados/:mentorId', async (req, res) => {
  const mentorId = parseInt(req.params.mentorId, 10);

  if (isNaN(mentorId)) {
    return res.status(400).send('Invalid mentorId');
  }

  try {
    const mentorados = await mentoriaRepo.getMentoradosByMentorId(mentorId);
    if (!mentorados.length) {
      return res.status(404).send('No mentorados found for this mentor');
    }
    res.status(200).json(mentorados);
  } catch (error) {
    console.error('Error in mostrarMentorados route:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
