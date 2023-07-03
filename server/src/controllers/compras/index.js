const knex = require("../../database/index");

module.exports = {
    async cadcompras(req, res) {
        try {
            const { comp_id: idcomp } = req.body;
            const { prod_id: idprod } = req.body;
            const { user_id: id } = req.body;

            //user_user_CPF: cpf, req_data: date,  req_data: env, req_TipoCartao: card
            await knex("compras").insert({comp_id: idcomp, prod_id: idprod,  user_id: id });
            
            res.status(201).send('mensagem envidada!');
        } catch (error) {
            res.status(400).send('deu ruim!');
            console.log(error);
        }
    },

    async consultcompras(req, res) {
        try {
            const { comp_id: id } = req.body;
            if (id != undefined) {
                const consult = await knex("compras").where('comp_id', '=', `%${id}%`);
                return res.status(201).send(consult);
            }
        } catch (error) {
            console.log(error); 
        }
    },

    async attcomprass(req, res){
        try {
            const { comp_id: idcomp } = req.body;
            const { prod_id: idprod } = req.body;
        
            await knex('compras').where('comp_id', '=', String(id)).update({prod_id: idprod});
            
            res.status(201).send('atualizado!');
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async excldcomprass(req, res){
        try {
            const { comp_id: id } = req.body;
            await knex('compras').where('comp_id', '=', String(id)).del()
            res.status(201).send('excluido!');
        } catch (error) {
            res.status(400).send(error);
        }
    }
}