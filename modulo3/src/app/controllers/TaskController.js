import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId, check: false }, // trazer apenas as tarefas não concluidas
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Nada encontrado' });
    }

    return res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha ao cadastrar' });
    }

    const { task } = req.body;

    const tasks = await Task.create({
      task,
      user_id: req.userId,
    });

    return res.json(tasks);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      check: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Informe os campos obrigatórios' });
    }
    const { task_id } = req.params;
    const { check } = req.body;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    if (req.userId !== task.user_id) {
      // Verifica se a tarefa que está sendo checkada é do usuário autenticado
      return res.status(401).json({ error: 'Requisição não autorizada' });
    }

    await task.update({ check });

    return res.json(task);
  }

  async delete(req, res) {
    const task = await Task.findByPk(req.params.task_id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    if (req.userId !== task.user_id) {
      // Verifica se a tarefa que está sendo checkada é do usuário autenticado
      return res.status(401).json({ error: 'Requisição não autorizada' });
    }

    await task.destroy();
    return res.send();
  }
}

export default new TaskController();
