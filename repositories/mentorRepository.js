// repositories/mentorRepository.js
const BaseRepository = require('./baseRepository');
const { poolPromise, sql } = require('../config/db');

class MentorRepository extends BaseRepository {
  constructor() {
    super('mentor'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  async virarMentor(userId, isActive) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.updateUserStatus(userId, isActive);

    const mentor = await this.getMentorByUserId(userId);
    if (mentor) {
      // Mentor already exists, no need to insert a new record
      console.log('Mentor record already exists for user:', userId);
    } else {
      // Mentor does not exist, insert a new record
      await this.insertMentor(userId);
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