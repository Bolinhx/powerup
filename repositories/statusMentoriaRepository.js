// repositories/statusMentoriaRepository.js
const BaseRepository = require('./baseRepository');

class StatusMentoriaRepository extends BaseRepository {
  constructor() {
    super('status_mentoria'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Adicione métodos específicos de StatusMentoria aqui, se necessário
}

module.exports = new StatusMentoriaRepository();
