import jwt from "jsonwebtoken";
import UserDAL from "../DAL/UserDal.js"

export default class UserController
{   
    async login (request, response) {
        let login = request.query.login;
        let senha = request.query.senha;
        if(login && senha) {
            let usuarioDal = new UserDAL();
            let user = await usuarioDal.logar(login, senha);
            if(user.login !== ""  && user.senha !== ""){
                let token = jwt.sign({user},SECRET,{expiresIn:600});
                console.log(token);
                response.status(200).json({msg:'Login realizado com sucesso', token});
            }
            else {
                response.json({msg:'Dados inválidos'});
            }
        }
        else {
            response.json({msg:'Dados inválidos'});
        }
    }
    
 }