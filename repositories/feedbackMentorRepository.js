// repositories/feedbackMentorRepository.js
const BaseRepository = require('./baseRepository');

class FeedbackMentorRepository extends BaseRepository {
  constructor() {
    super('feedback_mentor'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Metodos especificos
}

module.exports = new FeedbackMentorRepository();