// repositories/mentorRepository.js
const BaseRepository = require('./baseRepository');
const { poolPromise, sql } = require('../config/db');
const usuariosRepository = require('./usuariosRepository');

class MentorRepository extends BaseRepository {
  constructor() {
    super('mentor'); // Nome da tabela deve corresponder ao nome no script SQL
  }
  async getMentorByUserId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id_usuario', sql.Int, id)
        .query(`SELECT * FROM ${this.tableName} WHERE id_usuario = @id_usuario`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async virarMentor(userId, isActive) {
    const user = await usuariosRepository.getByIdUsuario(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await usuariosRepository.updateUserStatus(userId, isActive);

    const mentor = await this.getMentorByUserId(userId);
    if (mentor) {
      // Mentor already exists, no need to insert a new record
      console.log('Mentor record already exists for user:', userId);
    } else {
      // Mentor does not exist, insert a new record
      await this.criarMentor(userId);
    }
  }
  async criarMentor(id_usuario) {
    
    
    try {
      const pool = await poolPromise;
      const request = pool.request();
      await request
      .input('id_usuario', sql.Int, id_usuario)
      .query(`INSERT INTO mentor (id_usuario) VALUES (@id_usuario)`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllMentores() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`SELECT ${this.tableName}.id,usuarios.nome FROM ${this.tableName} LEFT JOIN usuarios ON usuarios.id = ${this.tableName}.id_usuario WHERE usuarios.flag_mentor_ativo = 1`);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new MentorRepository();