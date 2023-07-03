const knex = require("../../database/index");

module.exports = {
    async cadProduto(req, res) {
        try {
            const { prod_nome: nome } = req.body;
            const { prod_preco: preco } = req.body;
            const { prod_mes: mes } = req.body;
            const { user_id: id } = req.body;

            //user_user_CPF: cpf, req_data: date,  req_data: env, req_TipoCartao: card
            await knex("produto").insert({prod_nome: nome,prod_preco: preco, prod_mes: mes,  user_id: id });
            
            res.status(201).send('mensagem envidada!');
        } catch (error) {
            res.status(400).send('deu ruim!');
            console.log(error);
        }
    },

    async consultProduto(req, res) {
        try {
            const { prod_nome: nome } = req.body;
            if (nome != undefined) {
                const consult = await knex("produto").where('prod_nome', '=', `%${nome}%`);
                return res.status(201).send(consult);
            }
        } catch (error) {
            console.log(error); 
        }
    },

    async attProdutos(req, res){
        try {
            const { prod_id: id } = req.body;
            const { prod_nome: nome } = req.body;
            const { prod_preco: preco } = req.body;
            const { prod_mes: mes } = req.body;
           
            await knex('produto').where('prod_id', '=', String(id)).update({prod_nome: nome,  prod_preco: preco, prod_mes: mes});
            
            res.status(201).send('atualizado!');
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    async excldProdutos(req, res){
        try {
            const { prod_id: id } = req.body;
            await knex('produto').where('prod_id', '=', String(id)).del()
            res.status(201).send('excluido!');
        } catch (error) {
            res.status(400).send(error);
        }
    }
}