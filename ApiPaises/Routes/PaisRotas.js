import express from 'express';
import PaisController from '../Controllers/PaisController.js';
import Auth from "../filter/Auth.js";

const cctr = new PaisController();
const croutes = express.Router();

croutes.post("/insere-pais", Auth,cctr.inserePais);

croutes.get("/buscaPaisId", Auth,cctr.buscaPaisId);

croutes.get("/buscaPaisNome", Auth,cctr.buscaPaisNome);

croutes.get("/buscaPaisIdioma", Auth,cctr.buscaPaisIdioma);

export default croutes;