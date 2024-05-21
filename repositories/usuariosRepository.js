// repositories/usuariosRepository.js
const BaseRepository = require('./baseRepository');
const { poolPromise, sql } = require('../config/db');


class UsuariosRepository extends BaseRepository {
  constructor() {
    super('usuarios');
  }
  //metodos especificos
  async verifyIfActivationCodeExists(codigo_ativacao) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('codigo_ativacao', sql.VarChar, codigo_ativacao)
        .query(`SELECT * FROM usuarios WHERE codigo_ativacao = @codigo_ativacao`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
    
  }
  async getByIdUsuario(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`SELECT * FROM usuarios WHERE id = @id`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async updateUserStatus(id, flag_mentor_ativo) {
    try {
      const pool = await poolPromise;
      const request = pool.request()
        .input('id', sql.Int, id)
        .input('flag_mentor_ativo', sql.Bit, flag_mentor_ativo);
      await request.query(`UPDATE usuarios SET flag_mentor_ativo = @flag_mentor_ativo WHERE id = @id`);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new UsuariosRepository();