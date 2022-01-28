import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {
    async index(req, res) {
        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id }).populate(
            'house'
        ); //procurar reservas do usuário logado (user_id do header) e dar um populate para trazer dados da casa também
        return res.json(reserves);
    }

    async store(req, res) {
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if (!house) {
            //if house doensn't exist
            return res.status(400).send({ error: 'Essa casa não existe' });
        }

        if (house.status !== true) {
            //Do not allow booking a house that has already been booked
            return res.status(400).json({ error: 'Solicitação indisponivel' });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ error: 'Reserva não permitida' });
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        await House.updateOne({ _id: house_id }, { status: false });

        await reserve.populate('house').populate('user').execPopulate(); //adicionar informações do user e da house

        return res.json(reserve);
    }

    async destroy(req, res) {
        const { reserve_id } = req.params;
        const { user_id } = req.headers;

        if (!user_id || !reserve_id) {
            return res.status(400).json({error: 'Informe os dados obrigatórios'}); 
        }

        const reserva = await Reserve.findById({ _id: reserve_id });
        
        if (!reserva) {
            return res.status(404).json({error: 'Reserva não encontrada'});
        }
        
        const user = await User.findById({ _id: user_id});
        if (!user) {
            return res.status(401).json({error: 'Usuário não encontrado'});
        }

        if (String(user._id) !== String(reserva.user)) {
            return res.status(400).json({error: 'Essa reserva não pertence a este usuário'}); 
        }

        await Reserve.findByIdAndDelete({ _id: reserve_id });
        return res.send();
    }
}

export default new ReserveController();
