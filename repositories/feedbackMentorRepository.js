// repositories/feedbackMentorRepository.js
const BaseRepository = require('./baseRepository');

class FeedbackMentorRepository extends BaseRepository {
  constructor() {
    super('feedback_mentor'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Adicione métodos específicos de FeedbackMentor aqui, se necessário
}

module.exports = new FeedbackMentorRepository();