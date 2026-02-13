import { createContext, useContext, useEffect, useState } from "react";
import type { Pergunta, Resposta } from "../types/models"

interface DataContextType {
    perguntas: Pergunta[];
    respostas: Resposta[];
    addPergunta: (p: Pergunta) => void;
    updatePergunta: (p: Pergunta) => void;
    deletePergunta: (id: string) => void;
    addResposta: (r: Resposta) => void;
    updateResposta: (r: Resposta) => void;
    deleteResposta: (id: string) => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: any) => {
    const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
    const [respostas, setRespostas] = useState<Resposta[]>([]);

    useEffect(() => {
        const p = localStorage.getItem("perguntas");
        const r = localStorage.getItem("respostas");
        if (p) setPerguntas(JSON.parse(p));
        if (r) setRespostas(JSON.parse(r));
    }, []);

    useEffect(() => {
        localStorage.setItem("perguntas", JSON.stringify(perguntas));
    }, [perguntas]);

    useEffect(() => {
        localStorage.setItem("respostas", JSON.stringify(respostas));
    }, [respostas]);

    const addPergunta = (p: Pergunta) => setPerguntas([...perguntas, p]);
    const updatePergunta = (p: Pergunta) => setPerguntas(perguntas.map((x) => (x.id === p.id ? p : x)));
    const deletePergunta = (id: string) => setPerguntas(perguntas.filter((x) => x.id !== id));

    const addResposta = (r: Resposta) => setRespostas([...respostas, r]);
    const updateResposta = (r: Resposta) => setRespostas(respostas.map((x) => (x.id === r.id ? r : x)));
    const deleteResposta = (id: string) => {
        setRespostas(respostas.filter((x) => x.id !== id));
        setPerguntas(
            perguntas.map((p) => ({
                ...p,
                respostasIds: p.respostasIds.filter((rid) => rid !== id),
            }))
        );
    };

    return (
        <DataContext.Provider
            value={{
                perguntas,
                respostas,
                addPergunta,
                updatePergunta,
                deletePergunta,
                addResposta,
                updateResposta,
                deleteResposta,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
