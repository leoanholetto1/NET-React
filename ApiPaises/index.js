import express from 'express';
import croutes from "./Routes/PaisRotas.js"
import cors from "cors";
import uroutes from "./Routes/UserRotas.js"

const app = express();
global.SECRET = 'chavesupersecreta';

app.use(express.json());
app.use(cors("*"));
app.use(croutes);
app.use(uroutes)

app.listen(8081, () => {
    console.log("Servidor na porta 8081");   
});