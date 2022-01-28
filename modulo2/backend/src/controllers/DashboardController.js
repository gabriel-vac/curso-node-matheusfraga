import House from '../models/House';

class DashboardController {
    async show(req, res) {

        const { user_id } = req.headers;

        const houses = await House.find({ user: user_id }); //buscar todas as casas de um determinado usuario (user_id) 

        return res.json(houses);
    }
}

export default new DashboardController();
