// metodos: index, show, update, store, destroy
/*
index: Listagem de sessoes
store: Criar uma sessao
show: Listar uma unica sessao
update: Quando queremos alterar alguma sessao
destroy: Quando queremos deletar uma sessao
*/

import * as Yup from 'yup';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(req.body))) {
            // validação é assincrona
            return res.status(400).json({
                error: 'E-mail inválido',
            });
        }

        // usa destruturação do java script e pega o "email" do "req.body"
        const { email } = req.body;

        // Verificando se esse usuario já existe
        let user = await User.findOne({
            email,
        });

        // Se não existir vai criar um novo, se existir iremos só retornar os dados para ele indicando que ele está logado
        if (!user) {
            // pegamos o email da requisição e criamos no banco de dados passando este email
            user = await User.create({
                email,
            }); // await faz esperar essa requisição antes de passar para próxima linha, e para usar o await, precisamos falar pra nossa função store que ela é assincrona passando async na declaração
            // user = User.create({ email : email }); como o campo tem o mesmo nome do model posso fazer da forma de cima, se não teria que fazer dessa forma
        }

        return res.json(user);
    }
}

export default new SessionController();
