"use client"

import { useState, useEffect } from "react";
import { isEmpty } from "../utils";
import { useRouter, useSearchParams } from "next/navigation";
import Cadastro from "./components/Cadastro";
export default function Login() {
    
   const router = useRouter();
   const searchParams = useSearchParams();
   const sair = searchParams.has('sair');

   const [stateUsuario, setStateUsuario] = useState({
      nome: "",
      senha: ""
   });
   
   const [msg, setMsg] = useState("");
   const [abrirModal, setAbrirModal] = useState(false);

   useEffect(() => {
    if (sair)
    {
        logout();
    }


   }, []);

   const validar = () => {

      if (isEmpty(stateUsuario.nome) || isEmpty(stateUsuario.senha))
      {
         setMsg("Dados não fornecidos.");
         return;
      }

      let options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }

        let url = "/api-backoffice/LoginSite/autenticar?nome=" + stateUsuario.nome +"&senha=" + stateUsuario.senha;
            fetch(url, options)
            .then(r => {

                if (r.ok)
                    router.push("/admin");
                else alert("Dados inválidos");
            });
   }

   const logout = () => {

        let options = {
            method:"GET",
        }

      let url = "/api-backoffice/LoginSite/logout";
     fetch(url, options);
   }

   const renderForm = () => {

      let saida = 
      <div>
          
          <div className="form-group">
              <label>Usuário</label>
              <input type="text" className="form-control" 
                  value={stateUsuario.nome}
                  onChange={(e) => 
                       setStateUsuario(prevState => ({...prevState, nome: e.target.value}))} />
          </div>

          <div className="form-group">
              <label>Senha</label>
              <input type="text" className="form-control" 
                  value={stateUsuario.senha}
                  onChange={(e) => setStateUsuario(prevState => ({...prevState, senha: e.target.value}))} />
          </div>

          <div className="form-group">
              <button className="btn btn-primary" 
               onClick={validar}
                      type="button">Entrar</button>
          </div>

          {!isEmpty(msg) && 
            <div className="alert alert-danger">
               {msg}
            </div>
          }

          {abrirModal && 
            <Cadastro fecharModal={() => setAbrirModal(false)} />}

          <div className="form-group">
              <a className="3" href="#" onClick={() => setAbrirModal(true)}  >não tenho um conta</a>
          </div>

           

      </div>

      return saida;
  }


  return (
      <div className="container">
          <div className="row justify-content-center">
           
              <div className="col-xl-10 col-lg-12 col-md-9">

                  <div className="card o-hidden border-0 shadow-lg my-5">
                      <div className="card-body p-0">
                          <div className="row">
                              <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                              <div className="col-lg-6">
                                  <div className="p-5">
                                      <div className="text-center">
                                          <h1 className="h4 text-gray-900 mb-4">Autenticação</h1>
                                      </div>
                                      {renderForm()}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>

          </div>

      </div>
  )
}
  