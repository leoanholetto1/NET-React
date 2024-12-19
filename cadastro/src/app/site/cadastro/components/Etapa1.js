"use client"
import { useState } from "react";
function Etapa1(props){
    const [stateCpf,setStateCpf] = useState("");

    const adicionar = ()=>{
        props.setStatePai(stateCpf);
    };

    let saida = 
        <div className="mt-5">
        <div className="form-group">
            <p>Informe o seu CPF*</p>
            <input className="form-control"
            type="text"
            onChange={(e) => {
                setStateCpf(e.target.value);
            }}
            value = {stateCpf}/>
        </div>
        <button 
        type="button"
        onClick={adicionar}
        className="btn btn-primary"
        disabled={stateCpf.length !== 11}>  Continuar</button>
    </div>
    return saida;
}

export default Etapa1;
