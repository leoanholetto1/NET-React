"use client"
import { useState } from "react";
function Etapa2(props){
    const [stateIdenti,setStateIdenti] = useState(props.statePai);
    const [msg, setMsg] = useState({tipo: "", texto: ""});
    const adicionar = ()=>{
        console.log(stateIdenti);
        if(stateIdenti.nome !== "" && stateIdenti.cel !== ""  && stateIdenti.nasc !== ""){
            props.setStatePai(stateIdenti);
            props.setEstadoId(true);
        }
        else{
            setMsg({tipo:"danger", texto: "Campos marcados com * são obrigatórios."});
        }
    };

    let saida = 
        <div className="mt-5">
        <div className="form-group">
            <p>Nome Completo*</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateIdenti({...stateIdenti, nome: e.target.value});
            }}
            placeholder="Seu nome completo"
            value = {stateIdenti.nome}/>
            <p className="mt-2">Data de Nascimento*</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateIdenti({...stateIdenti, nasc: e.target.value});
            }}
            placeholder="dd/mm/aaaa"
            value = {stateIdenti.nasc}/>
            <p className="mt-2">Celular*</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateIdenti({...stateIdenti, cel: e.target.value});
            }}
            placeholder="(18) 99713-1978"
            value = {stateIdenti.cel}/>
        </div>
        <button 
        type="button"
        onClick={adicionar}
        className="btn btn-primary"> <i className="fas fa-arrow-right"></i> Próximo</button>
        {msg.texto != "" ?
            <div className={"mt-3 alert alert-" + msg.tipo}>{msg.texto}</div> 
            :null
        }
    </div>
    return saida;
}

export default Etapa2;
