import postgres from "pg";
const { Client } = postgres;
import Banco from "../banco.js";
import User from "../Models/User.js";

export default class UserDAL {
    
    async logar(id,senha) {
        let client = await new Banco().conectar();
        let user = new User("","");

        try {
            let res = await client.query(`SELECT * from usuario where login = '${id}' and senha = '${senha}'`);
            if (res.rows.length > 0)
                user = res.rows[0];
        }
        finally {
            client.end();
        }

        return user;
    }
}
