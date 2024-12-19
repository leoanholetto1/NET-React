import PaisDAL from "../DAL/PaisDal.js";

const dal = new PaisDAL();

export default class PaisController {

    //http://localhost:8081/insere-pais
    /* {
        "sigla": "TES",
        "idioma": "TT",
        "nome": "Teste"
        }
    */
    inserePais(request, response){
        let pais = request.body;

        dal.gravar(pais)
        .then(res => {
            if(res)    
                response.status(200).send({ msg:"País inserido!", sucesso: true });
            else
                response.status(500).send({ msg:"Ops... ocorreu um erro!", sucesso: false });
        });
    }

    //http://localhost:8081/buscaPaisId?id=2
    buscaPaisId(request, response){
        let id = parseInt(request.query.id);

        dal.selecionarUm(id)
        .then((res) => { return res })
        .then((r) => {
            return response.status(200).json(r);
        });
    }

    //http://localhost:8081/buscaPaisNome?nome=Brasil
    buscaPaisNome(request, response){
        let nome = request.query.nome;

        dal.selecionarPorNome(nome)
        .then((res) => { return res })
        .then((r) => {
            return response.status(200).json(r);
        });
    }

    //http://localhost:8081/buscaPaisIdioma?idioma=PT
    buscaPaisIdioma(request, response){
        let idioma = request.query.idioma;
        
        dal.selecionarPorIdioma(idioma)
        .then((res) => { return res })
        .then((r) => {
            return response.status(200).json(r);
        });
    }
}