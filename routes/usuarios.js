// routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuariosRepository = require('../repositories/usuariosRepository');

// GET: Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuariosRepository.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET: Obter um usuário por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuariosRepository.getById(id);
    res.json(usuario);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    await usuariosRepository.create(req.body);
    res.status(201).send({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT: Atualizar um usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await usuariosRepository.update(id, req.body);
    res.send({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// DELETE: Deletar um usuário
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await usuariosRepository.delete(id);
    res.send({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
