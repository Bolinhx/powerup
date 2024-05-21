// repositories/baseRepository.js
const { poolPromise, sql } = require('../config/db');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`SELECT * FROM ${this.tableName}`);
      return result.recordset;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`SELECT * FROM ${this.tableName} WHERE id = @id`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getStatusMentorById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`SELECT flag_mentor_ativo FROM ${this.tableName} WHERE id = @id`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  

  async getByStatusId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`SELECT * FROM ${this.tableName} WHERE id_status_treinamento = @id`);
      return result.recordset[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async create(data) {
    const columns = Object.keys(data).join(', ');
    const values = Object.keys(data).map((key, index) => `@${key}`).join(', ');
    
    try {
      const pool = await poolPromise;
      const request = pool.request();
      Object.keys(data).forEach(key => {
        request.input(key, data[key]);
      });
      await request.query(`INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(id, data) {
    const updates = Object.keys(data).map(key => `${key} = @${key}`).join(', ');
    
    try {
      const pool = await poolPromise;
      const request = pool.request().input('id', sql.Int, id);
      Object.keys(data).forEach(key => {
        request.input(key, data[key]);
      });
      await request.query(`UPDATE ${this.tableName} SET ${updates} WHERE id = @id`);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query(`DELETE FROM ${this.tableName} WHERE id = @id`);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = BaseRepository;