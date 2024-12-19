import postgres from "pg";
const { Client } = postgres;
import Banco from "../banco.js";
import Pais from "../Models/Pais.js";

export default class PaisDAL {
    
    async selecionarUm(id) {
        let client = await new Banco().conectar();
        let pais = new Pais(0, "", "", "");

        try {
            let res = await client.query(`SELECT * from pais where id = ${id}`);
            if (res.rows.length > 0)
                pais = res.rows[0];
        }
        finally {
            client.end();
        }

        return pais;
    }

    async selecionarPorNome(filtro) {
        let client = await new Banco().conectar();
        let query = "SELECT * from pais";

        if (filtro != "")
            query = query + ` where nome like '%${filtro}%'`;

        try {
            let res = await client.query(query);
            return res.rows;
        }
        finally {
            client.end();
        }
    }

    async selecionarPorIdioma(filtro) {
        let client = await new Banco().conectar();
        let query = "SELECT * from pais";

        if (filtro != "")
            query = query + ` where idioma like '%${filtro}%'`;

        try {
            let res = await client.query(query);
            return res.rows;
        }
        finally {
            client.end();
        }
    }

    async gravar(pais) {
        let client = await new Banco().conectar();
        let sql = "INSERT INTO pais VALUES (default,$1,$2,$3)";
        let values = Object.values(pais).slice(0);

        try {
            let res = await client.query(sql, values);
            return res.rowCount>0;
        }
        catch(Exception) {
            return false;
        }
        finally {
            client.end();
        }
    }
}
