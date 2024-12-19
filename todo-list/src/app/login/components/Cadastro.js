'use client';
import { useEffect, useState } from "react";
import LoadingIndicator from "@/app/components/loadingIndicador/LoadingIndicator";

export default function Cadastro(props) {
  
    const [stateUsuario, setStateUsuario] = useState({
        nome: "",
        email: "",
        senha: "",
        senhaConfirmacao: "",
    });

    const [aguadar, setAguardar] = useState(false);

    //básico, executado qdo o componentes estiver pronto
    //manipular o DOM
    //fetch
    useEffect(() => {
        
        tratarModal();

    }, []);
  
    const tratarModal = () => {
        $('#modalCadastro').modal("show");

        $('#modalCadastro').on("hidden.bs.modal", () => {
             props.fecharModal();
        });
    }

    const cadastrar = () => {


        if (stateUsuario.senha != stateUsuario.senhaConfirmacao)
        {
            alert("Senhas diferentes");
            return;
        }

        setAguardar(true);

        let options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stateUsuario)
        }

        fetch("/api-backoffice/Usuarios", options)
        .then(r =>{
            
            setAguardar(false);

            if (r.ok)
               $('#modalCadastro').modal("hide");
        });



        //$('#modalCadastro').modal("hide");

        //props.fecharModal();
    }

    const renderForm = () => {

        let saida = 
        <div>
             <div className="form-group">
                <label>Nome</label>
                <input type="text" className="form-control" 
                    value={stateUsuario.nome}
                    onChange={(e) => setStateUsuario(prevState => ({...prevState, nome: e.target.value}))} />
            </div>

            <div className="form-group">
                <label>Usuário</label>
                <input type="text" className="form-control" 
                    value={stateUsuario.email}
                    onChange={(e) => setStateUsuario(prevState => ({...prevState, email: e.target.value}))} />
            </div>

            <div className="form-group">
                <label>Senha</label>
                <input type="text" className="form-control" 
                    value={stateUsuario.senha}
                    onChange={(e) => setStateUsuario(prevState => ({...prevState, senha: e.target.value}))} />
            </div>

            <div className="form-group">
                <label>Senha Confirmação</label>
                <input type="text" className="form-control" 
                    value={stateUsuario.senhaConfirmacao}
                    onChange={(e) => setStateUsuario(prevState => ({...prevState, senhaConfirmacao: e.target.value}))} />
            </div>
 
        </div>

        return saida;
    }
    
    return (
        <div id="modalCadastro" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {renderForm()}
                        {aguadar && <LoadingIndicator />}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" 
                            onClick={cadastrar}
                        >Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    );




  }
  