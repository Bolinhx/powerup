// repositories/agendarTreinamentoRepository.js
const BaseRepository = require('./baseRepository');

class AgendarTreinamentoRepository extends BaseRepository {
  constructor() {
    super('agendar_treinamento'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Adicione métodos específicos de AgendarTreinamento aqui, se necessário
}

module.exports = new AgendarTreinamentoRepository();