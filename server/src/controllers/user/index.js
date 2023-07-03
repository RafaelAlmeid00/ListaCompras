/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const knex = require("../../database/index");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const localData = require('../Middleware');
const cookie = require('cookie-parser');

require('dotenv').config();

module.exports = {
    async root(req, res) {
        try {
            return res.send("Response of Client Server");
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async searchUser(req, res) {
        try {
            console.log('aaaaaaaaaaaaaaaa');
            const result = await knex("user");
            res.status(201).json(result);
        } catch (error) {
            console.log('error: ', error);
            return res.status(400).json({ error: error.message });
        }
    },

    async createUser(req, res) {
        try {
            
            const { user_nome: nome } = req.body;
            const { user_email: email } = req.body;
            const { user_senha: senha } = req.body;
            console.log('teste rapidão: ', email);

            const senhahash = await bcrypt.hash(senha, 10);

            await knex("user").insert({
                user_nome: nome,
                user_email: email,
                user_senha: senhahash,
            });

        return res.status(201).send("User registered");
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
    },

  
async UserLogin(req, res) {
  try {
            const { user_nome: nome } = req.body;
            const { user_email: email } = req.body;
            const { user_senha: senha } = req.body;

    const [ takeUser ] = await knex("user").where("user_email", "=", String(email));

    if (takeUser != undefined) {
      bcrypt.compare(senha, takeUser.user_senha, function (err, comp) {
        if (err || comp == false) {
          console.log('comp: ', comp);
          console.log(err);
        } else {
          console.log('this is comp: ', comp);

          const token = JWT.sign({
                user_nome: nome,
                user_email: email,
                user_senha: senha,
          },'Uz&Nxq6ifp*bqvBJgG$z', { expiresIn: '1000000' });
          console.log('this is req.headers: ', req.headers);
          const userData = takeUser
        res.cookie('token', token, {secure: true})  

        return res.status(201).send({
          token: token,
          user: userData,
          message: "ok!"
        });
        }
      });
    }else{res.status(400).send('email ou senha inválido')} 
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
},

async DeleteUser (req, res) {
  try {

      const { user_email: data } = req.body;

      console.log('this is cookies 2: ', data);
      console.log('someone here??');
            
      const result = await knex("user").where('user_email', '=', data).del();
      res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true });

      res.status(201).json(result);
  } catch (error) {
      console.log('error: ', error);
      return res.status(400).json({ error: error.message });
  }
},

async UpdateUser(req, res){
  try {
      const { user_email: data } = req.body;
      const { info: dado } = req.body;
      const { param: parame } = req.body;

      console.log('this is parame: ', parame);
      await knex("user").where("user_email", "=", data).update(`${parame}`, dado);

  } catch (error) {
      console.log(error);
  }
}
};
