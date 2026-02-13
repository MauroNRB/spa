import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, DialogActions, Button, FormGroup } from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useData } from "../context/DataContext";
import type { Pergunta } from "../types/models";

interface Props {
    open: boolean;
    onClose: () => void;
    pergunta?: Pergunta;
}

export default function PerguntaDialog({ open, onClose, pergunta }: Props) {
    const { respostas, addPergunta, updatePergunta } = useData();

    const [nome, setNome] = useState(pergunta?.nome || "");
    const [ativo, setAtivo] = useState(pergunta?.ativo ?? true);
    const [ordem, setOrdem] = useState(pergunta?.ordem || 0);
    const [selecionadas, setSelecionadas] = useState<string[]>(pergunta?.respostasIds || []);

    const toggle = (id: string) => {
        setSelecionadas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const handleSave = () => {
        const nova: Pergunta = {
            id: pergunta?.id || uuid(),
            nome,
            ativo,
            ordem,
            respostasIds: selecionadas,
        };

        pergunta ? updatePergunta(nova) : addPergunta(nova);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{pergunta ? "Editar" : "Nova"} Pergunta</DialogTitle>
            <DialogContent>
                <TextField fullWidth margin="normal" label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                <TextField fullWidth type="number" margin="normal" label="Ordem" value={ordem} onChange={(e) => setOrdem(+e.target.value)} />
                <FormControlLabel control={<Checkbox checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />} label="Ativo" />

                <FormGroup>
                    {respostas.map((r) => (
                        <FormControlLabel key={r.id} control={<Checkbox checked={selecionadas.includes(r.id)} onChange={() => toggle(r.id)} />} label={r.nome} />
                    ))}
                </FormGroup>
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
