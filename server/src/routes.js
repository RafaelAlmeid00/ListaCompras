/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cookie = require('cookie-parser');

//controllers
const controllersUser = require('./controllers/user/index');
const controllerProd = require('./controllers/produto/index');
const controllersMerc = require('./controllers/mercado/index');
const controllersComp = require('./controllers/compras/index');

const middleware = require('./controllers/Middleware');

const routes = express.Router();

routes.use(cookie());

routes.get('/user', controllersUser.searchUser);
routes.post('/user', controllersUser.createUser);
routes.get('/user/login', controllersUser.UserLogin);
routes.post('/user/login', controllersUser.UserLogin);


routes.get('/produtos', controllerProd.consultProduto);
routes.post('/produtos', controllerProd.cadProduto);
routes.post('/produtos', controllerProd.attProdutos);
routes.post('/produtos', controllerProd.excldProdutos);

routes.get('/mercado', controllersMerc.consultmercados);
routes.post('/mercado', controllersMerc.cadmercado);
routes.post('/mercado', controllersMerc.attmercados);
routes.post('/mercado', controllersMerc.excldmercados);

routes.get('/compras', controllersComp.consultcompras);
routes.post('/compras', controllersComp.cadcompras);
routes.post('/compras', controllersComp.attcomprass);
routes.post('/compras', controllersComp.excldcomprass);

module.exports = routes;