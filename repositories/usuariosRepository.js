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
  //   try{
  //   const pool = await sql.connect(this.config);
  //   const result = await pool.request()
  //     .input('codigo_ativacao', sql.NVarChar, codigo_ativacao)
  //     .query('SELECT * FROM usuarios WHERE codigo_ativacao = @codigo_ativacao');
    
  //   return result.recordset[0];
  //  } catch (error) {
  //   console.error('Error fetching user by activation code:', error);
  //   throw error;
  //   }
  }
}

module.exports = new UsuariosRepository();