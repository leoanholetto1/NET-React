"use client"
import { useState, useRef } from "react";
import "../../utils";
import { gerarId } from "../../utils";

export default function TodoList () {

 
    const [stateItem, setStateItem] = useState({
        id: 0,
        descricao: "",
    });

    const [stateContar, setStateContar] = useState(0);

    const [msg, setMsg] = useState({tipo: "", texto: ""});

    const [stateItens, setStateItens] = useState([]);
 
    const refDescricao = useRef(null);

    const adicionar = () => {

        if (stateItem.descricao == "")
        {
            setMsg({tipo:"danger", texto: "Forneça um valor."});
        }   
        else {
            let itens = [...stateItens];

            let index = -1;
            if (stateItem.id != 0)
                index = itens.findIndex(item => item.id == stateItem.id);
                
            let item = {}; 
            if (index == -1)
            {
                item = {
                    id: gerarId(),
                    descricao: stateItem.descricao
                }
                itens.push(item);
            }
            else {
                itens[index].descricao = stateItem.descricao;
            }
            
            setStateItens(itens);
            setStateItem({id: 0, descricao: ""});
            setMsg({tipo:"success", texto: "Salvo com sucesso"});

        }
    }

    const contar = () => {

        let atual = stateContar;
        atual++;
        setStateContar(atual);
    }

    const excluir = (itemExcluir) => {

        if (!confirm(`Deseja excluir "${itemExcluir.descricao}"?`))
            return;
        let itens = stateItens.filter(item => item.id != itemExcluir.id);
        setStateItens(itens);
    }
    
    const editar = (itemEditar) => {

        setStateItem(itemEditar);

        if (refDescricao != null && refDescricao.current != null)
        {
            refDescricao.current.focus();
        }
    }

    const cancelar = () => {

        setStateItem({id:0, descricao: ""});
    }
    
    const renderItens = () => {

        if (stateItens.length == 0)
            return null;

       /* let miolo = 
            stateItens.forEach(item => {
                return (<tr>
                    <td>{item.id}</td>
                    <td>{item.descricao}</td>
                 </tr>);
            });
        */

        let saida = 
        <div className="mt-5">
        <h3>Tarefas ({stateItens.length})</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tarefa</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {stateItens.map(item => (
                    <tr className={item.id == stateItem.id ? "bg-light" : ""}>
                        <td>{item.id}</td>
                        <td>{item.descricao}</td>
                        <th>
                            <button 
                                type="button" 
                                disabled={item.id == stateItem.id}
                                className={"btn btn-primary mx-2 " + (item.id == stateItem.id ? "disabled" : "")}
                                onClick={() => editar(item)}
                                >Editar</button>
                            <button 
                                type="button" 
                                disabled={item.id == stateItem.id}
                                className={"btn btn-danger mx-2 " + (item.id == stateItem.id ? "disabled" : "")}
                                onClick={() => excluir(item)}
                                >Excluir</button>
                        </th>
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
            <h1>Todo List</h1>
            <div className="mt-5">
                <div className="form-group">
                    <input className="form-control"
                     type="text"
                     ref={refDescricao}
                     onChange={(e) => {
                                setStateItem({...stateItem, descricao: e.target.value});
                                setMsg("");
                     }}
                     value={stateItem.descricao} />
                </div>

                {msg.texto != "" ?
                    <div className={"alert alert-" + msg.tipo}>{msg.texto}</div> 
                    :null
                }

                {/*msg != "" &&
                    <div className="alert alert-danger">{msg}</div> 
                */}

                <button 
                 type="button"
                 onClick={() => adicionar()}
                 className="btn btn-primary">Adicionar</button>

                {stateItem.id != 0 &&
                    <button 
                    type="button"
                    onClick={() => cancelar()}
                    className="btn btn-danger mx-2">Cancelar</button>
                }
            </div>
        </>

        return saida;

    }



    return (
        <div>
            {renderForm()}
            {renderItens()}
            <div>
                conta: {stateContar}
                
            </div> 
        </div>
    );

}