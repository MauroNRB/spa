import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, DialogActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import type { Resposta } from "../types/models";
import { useData } from "../context/DataContext";

interface Props {
    open: boolean;
    onClose: () => void;
    resposta?: Resposta;
}

export default function RespostaDialog({ open, onClose, resposta }: Props) {
    const { addResposta, updateResposta } = useData();

    const [nome, setNome] = useState("");
    const [ativo, setAtivo] = useState(true);
    const [ordem, setOrdem] = useState(0);

    useEffect(() => {
        if (resposta) {
            setNome(resposta.nome);
            setAtivo(resposta.ativo);
            setOrdem(resposta.ordem);
        } else {
            setNome("");
            setAtivo(true);
            setOrdem(0);
        }
    }, [resposta, open]);

    const handleSave = () => {
        const nova: Resposta = {
            id: resposta?.id || uuid(),
            nome,
            ativo,
            ordem,
        };

        resposta ? updateResposta(nova) : addResposta(nova);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{resposta ? "Editar" : "Nova"} Resposta</DialogTitle>
            <DialogContent>
                <TextField fullWidth margin="normal" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <TextField fullWidth type="number" margin="normal" label="Ordem" value={ordem} onChange={(e) => setOrdem(+e.target.value)} />
                <FormControlLabel control={<Checkbox checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />} label="Ativo" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
