import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco de dados com nossos models
    this.connection = new Sequelize(databaseConfig);
    // Percorrer todo o array
    // eslint-disable-next-line prettier/prettier
    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
