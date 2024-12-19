"use client"
import { useState, useEffect  } from "react";
import Etapa1 from "./components/Etapa1";
import Etapa2 from "./components/Etapa2";
import Etapa3 from "./components/Etapa3";
export default function Home() {
    const [stateCpf,setStateCpf] = useState(false);
    const [stateIdenti, setStateIdenti] = useState(false);
    const [stateEnd, setStateEnd] = useState(false);
    const [stateEtapa1,setStateEtapa1] = useState("");
    const [stateEtapa2,setStateEtapa2] = useState({
        nome:"",
        nasc:"",
        cel:""
    });
    const [stateEtapa3,setStateEtapa3] = useState({
        cep:"",
        logradouro:"",
        num:0,
        bairro:"",
        uf:"",
        cidade:""
    });


    useEffect(() => {
        if (stateEtapa1.length === 11) {
            setStateCpf(true);
        } 
    }, [stateEtapa1]);

    const render = ()=>{
        if(stateCpf == false){
            return <Etapa1 setStatePai = {setStateEtapa1}></Etapa1>;
        }
        else{
            if(stateIdenti == false){
                return <Etapa2 setStatePai = {setStateEtapa2} statePai = {stateEtapa2} setEstadoId = {setStateIdenti}></Etapa2>;
            }
            else{
                if(stateEnd == false){
                    return <Etapa3 setStatePai = {setStateEtapa3} setEstado = {setStateEnd} setEstadoId = {setStateIdenti} statePai ={stateEtapa3}></Etapa3>;
                }
                else{
                    setStateEtapa3({
                        cep:"",
                        logradouro:"",
                        num:0,
                        bairro:"",
                        uf:"",
                        cidade:""
                    });
                    setStateEtapa2({
                        nome:"",
                        nasc:"",
                        cel:""
                    });
                    setStateEtapa1("");
                    setStateCpf(false);
                    setStateIdenti(false);
                    setStateEnd(false);
                }
            }
        }
    };

    return (
        <div>
            <h1>Cadastra-se</h1>
            {render()}
        </div>
    );
}