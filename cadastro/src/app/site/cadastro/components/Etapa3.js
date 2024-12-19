"use client"
import { useState } from "react";
function Etapa3(props){
    const [stateEnd,setStateEnd] = useState(props.statePai);
    const [msg, setMsg] = useState({tipo: "", texto: ""});
    const adicionar = ()=>{
        if(stateEnd.cep !== ""){
            props.setEstado(true);
            props.setStatePai(stateEnd);
        }
        else{
            setMsg({tipo:"danger", texto: "Campos marcados com * são obrigatórios."});
        }
    };

    const voltar = () =>{
        props.setEstadoId(false);
        props.setStatePai(stateEnd);
    };

    let saida = 
        <div className="mt-5">
        <div className="form-group">
            <p>CEP*</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, cep: e.target.value});
            }}
            placeholder="00000-000"
            value = {stateEnd.cep}/>
            <p className="mt-2">Logradouro</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, logradouro: e.target.value});
            }}
            value = {stateEnd.logradouro}/>
            <p className="mt-2">Número</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, num: e.target.value});
            }}
            value = {stateEnd.num}/>
            <p>Bairro</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, bairro: e.target.value});
            }}
            value = {stateEnd.bairro}/>
            <p>UF</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, uf: e.target.value});
            }}
            value = {stateEnd.uf}/>
            <p>Cidade</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateEnd({...stateEnd, cidade: e.target.value});
            }}
            value = {stateEnd.cidade}/>
        </div>
        <div className="d-flex">
            <button 
                type="button"
                onClick={voltar}
                className="btn btn-primary mr-2">
                <i className="fas fa-arrow-left"></i> Voltar
            </button>
            <button
                type="button"
                onClick={adicionar}
                className="btn btn-primary">Finalizar</button>
        </div>
        {msg.texto != "" ?
            <div className={"mt-3 alert alert-" + msg.tipo}>{msg.texto}</div> 
            :null
        }
    </div>
    return saida;
}

export default Etapa3;
