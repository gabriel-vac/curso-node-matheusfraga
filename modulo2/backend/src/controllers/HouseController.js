import House from '../models/House'; //Importar o model
import User from '../models/User';
import * as Yup from 'yup'; //documentação fala pra importar dessa forma para importar tudo e todos os tipos

class HouseController {
    async index(req, res) {
        const { status } = req.query;

        const houses = await House.find({ status });

        return res.json(houses);
    }

    async store(req, res) {
        // console.log(req.body);
        // console.log(req.file);
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(), 
        });

        if(!(await schema.isValid(req.body))) { //validação é assincrona
            return res.status(400).json({ error: 'Falha na validação'});    
        }
        const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description, //posso colocar sem os dois pontos pois é o mesmo nome da tabela
            price,
            location,
            status,
        });

        return res.json(house);
    }

    async update(req, res) {

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(), 
        });

        if(!(await schema.isValid(req.body))) { //validação é assincrona
            return res.status(400).json({ error: 'Falha na validação'});    
        }

        const { filename } = req.file;
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        await House.updateOne(
            { _id: house_id },
            {
                user: user_id,
                thumbnail: filename,
                description, //posso colocar sem os dois pontos pois é o mesmo nome da tabela
                price,
                location,
                status,
            }
        );

        return res.send(); //mandar nada
    }

    async destroy(req, res) {

        const { house_id } = req.params;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        await House.findByIdAndDelete({ _id: house_id });

        return res.json({message: 'Excluida com sucesso!'});
    }
}

export default new HouseController();
