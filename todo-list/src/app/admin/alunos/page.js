"use client"
import { useState, useEffect } from "react";
import "../../utils";
import { isEmpty } from "../../utils";
import LoadingIndicator from "@/app/components/loadingIndicador/LoadingIndicator";

export default function Alunos () {

    const [stateTurmas, setStateTurmas] = useState([]);
    const [stateAlunos, setStateAlunos] = useState([]);
    const [aguarde, setAguarde] = useState(false);
    const [turma, setTurma] = useState(0);

    //apenas na 1 vez, qdo o componente está pronto
    //termina o primeiro render
    useEffect(() => {

        obterTurmas();

    }, []);

    useEffect(() => {

        obterAlunos();

    }, [turma]);


    const obterTurmas = () => {

        let options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
       
        setAguarde(true);
        fetch("/api-backoffice/Turmas", options)
        .then(r => r.json())
        .then(dados => {
            setStateTurmas(dados);
        })
        .finally(() => {

            setAguarde(false);
        });
    }

    const obterAlunos = () => {

        if (turma == 0)
            return;

        let options = {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
       
        setAguarde(true);
        fetch(`/api-backoffice/Alunos/Turma/${turma}`, options)
        .then(r => r.json())
        .then(dados => {
            setStateAlunos(dados);
        })
        .finally(() => {

            setAguarde(false);
        });
    }
    
    const renderAlunos = () => {

      
        let saida = 
        <div className="mt-5">
        <h3>Alunos ({stateAlunos.length})</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>RA</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>

                {stateAlunos.length == 0 &&
                    <tr>
                        <td colSpan="2">Nenhum aluno</td>
                    </tr>
                }

                {stateAlunos.map(item => (
                    <tr>
                        <td>{item.ra}</td>
                        <td>{item.nome}</td>
                    </tr>
                ))}


            </tbody>
        </table>
        </div>
        return saida;
    }

    const renderForm = () => {

        let saida = 
        <>
            <h1>Alunos</h1>
            <div className="mt-5">
                <div className="form-inline">
                    <select className="form-control col-sm-auto mr-2" 
                        onChange={(e) => setTurma(e.target.value)}>
                        <option value="0"></option>
                        {stateTurmas.map(t => <option key={t.id} value={t.id}>{t.numero}</option>)}
                    </select>

                    <button type="button col-sm-2 col-sm-2" 
                    className="btn btn-primary" onClick={obterAlunos}>Pesquisar</button>
                </div>
            </div>
        </>

        return saida;

    }



    return (
        <div>
            {renderForm()}
            {renderAlunos()}
            {aguarde && <LoadingIndicator />}
          
        </div>
    );

}