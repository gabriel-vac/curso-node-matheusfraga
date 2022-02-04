import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        task: Sequelize.STRING,
        check: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // A palavra chave static define um método estático para a classe. Métodos estáticos não são chamados na instâncias da classe.
  // Em vez disso, eles são chamados na própria classe. Geralmente, são funções utilitárias, como funções para criar ou clonar objetos.
  static associate(models) {
    // falando que essa associação pertence a algum usua´rio
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Task;
