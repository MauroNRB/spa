export interface Resposta {
    id: string;
    nome: string;
    ativo: boolean;
    ordem: number;
}

export interface Pergunta {
    id: string;
    nome: string;
    ativo: boolean;
    ordem: number;
    respostasIds: string[];
}
