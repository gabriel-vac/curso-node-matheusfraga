import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco de dados com nossos models
    this.connection = new Sequelize(databaseConfig);
    // Percorrer todo o array
    // eslint-disable-next-line prettier/prettier
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models)); // está percorrendo o array de models e se o model tiver o método associate ele irá executar
  }
}

export default new Database();
