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

//GET: Obter um usuário por codigo de ativação
router.get('/validar/:codigo_ativacao', async (req, res) => {
  const { codigo_ativacao } = req.params;
  try {
    const user = await usuariosRepository.findByActivationCode(codigo_ativacao);
    if (user) {
      res.status(200).send({ message: 'Codigo e valido.' });
    } else {
      res.status(404).send({ message: 'Codigo nao e valido.' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST: Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    if(!usuariosRepository.verifyIfActivationCodeExists(req.body.codigo_ativacao)){
      await usuariosRepository.create(req.body);
      res.status(201).send({ message: 'Usuário criado com sucesso' });
    }
    else{
      throw new Exception("Este código de ativação já existe!")
    }
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