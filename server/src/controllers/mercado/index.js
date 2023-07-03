const knex = require("../../database/index");

module.exports = {
    async cadmercado(req, res) {
        try {
            const { merc_nome: nome } = req.body;
            const { merc_bairro: bairro } = req.body;
            const { user_id: id } = req.body;

            //user_user_CPF: cpf, req_data: date,  req_data: env, req_TipoCartao: card
            await knex("mercado").insert({merc_nome: nome, merc_bairro: bairro, user_id: id });
            
            res.status(201).send('mensagem envidada!');
        } catch (error) {
            res.status(400).send('deu ruim!');
            console.log(error);
        }
    },

    async consultmercados(req, res) {
        try {
            const { merc_nome: nome } = req.body;
            if (nome != undefined) {
                const consult = await knex("mercado").where('merc_nome', '=', `%${nome}%`);
                return res.status(201).send(consult);
            }
        } catch (error) {
            console.log(error); 
        }
    },

    async attmercados(req, res){
        try {
            const { merc_id: id } = req.body;
            const { merc_nome: nome } = req.body;
           
            await knex('mercado').where('merc_id', '=', String(id)).update({merc_nome: nome});
            
            res.status(201).send('atualizado!');
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async excldmercados(req, res){
        try {
            const { merc_id: id } = req.body;
            await knex('mercado').where('merc_id', '=', String(id)).del()
            res.status(201).send('excluido!');
        } catch (error) {
            res.status(400).send(error);
        }
    }
}