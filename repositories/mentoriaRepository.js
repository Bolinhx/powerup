// repositories/mentoriaRepository.js
const BaseRepository = require('./baseRepository');

class MentoriaRepository extends BaseRepository {
  constructor() {
    super('mentoria'); // Nome da tabela deve corresponder ao nome no script SQL
  }

  async getMentoriaByUserAndMentor(userId, mentorId) {
    try {
      const pool = await sql.connect(this.config);
      const result = await pool.request()
        .input('id_usuario', sql.Int, userId)
        .input('id_mentor', sql.Int, mentorId)
        .query('SELECT * FROM mentoria WHERE id_usuario = @id_usuario AND id_mentor = @id_mentor');
      return result.recordset[0];
    } catch (error) {
      console.error('Error fetching mentoria by user and mentor id:', error);
      throw error;
    }
  }

  async escolherMentor(userId, mentorId) {
    const existingMentoria = await this.getMentoriaByUserAndMentor(userId, mentorId);
    if (existingMentoria) {
      throw new Error('Mentoria já existe');
    }

    const statusMentoriaAguardandoId = 2;
    await this.insertMentoria(userId, mentorId, statusMentoriaAguardandoId);
  }

  async updateMentoriaStatus(userId, mentorId, statusMentoriaId) {
    try {
      const pool = await sql.connect(this.config);
      const result = await pool.request()
        .input('id_usuario', sql.Int, userId)
        .input('id_mentor', sql.Int, mentorId)
        .input('id_status_mentoria', sql.Int, statusMentoriaId)
        .query('UPDATE mentoria SET id_status_mentoria = @id_status_mentoria WHERE id_usuario = @id_usuario AND id_mentor = @id_mentor');
      return result.rowsAffected[0];
    } catch (error) {
      console.error('Error updating mentoria status:', error);
      throw error;
    }
  }

  async getMentoradosByMentorId(mentorId) {
    try {
      const pool = await sql.connect(this.config);
      const result = await pool.request()
        .input('id_mentor', sql.Int, mentorId)
        .query(`
          SELECT u.*
          FROM mentoria m
          JOIN usuarios u ON m.id_usuario = u.id
          WHERE m.id_mentor = @id_mentor
        `);
      return result.recordset;
    } catch (error) {
      console.error('Error fetching mentorados by mentor id:', error);
      throw error;
    }
  }
}

module.exports = new MentoriaRepository();
