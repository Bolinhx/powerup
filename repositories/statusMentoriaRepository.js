// repositories/statusMentoriaRepository.js
const BaseRepository = require('./baseRepository');

class StatusMentoriaRepository extends BaseRepository {
  constructor() {
    super('status_mentoria'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Metodos especificos
}

module.exports = new StatusMentoriaRepository();
