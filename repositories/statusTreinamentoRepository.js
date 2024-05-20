// repositories/statusTreinamentoRepository.js
const BaseRepository = require('./baseRepository');

class StatusTreinamentoRepository extends BaseRepository {
  constructor() {
    super('status_treinamento'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  // Metodos especificos
}

module.exports = new StatusTreinamentoRepository();
