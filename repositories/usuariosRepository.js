// repositories/usuariosRepository.js
const BaseRepository = require('./baseRepository');

class UsuariosRepository extends BaseRepository {
  constructor() {
    super('usuarios');
  }

  // Adicione métodos específicos de Usuarios aqui, se necessário
}

module.exports = new UsuariosRepository();