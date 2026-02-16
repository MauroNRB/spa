import { useState, useMemo } from "react";
import { Button, Box, TextField, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useData } from "../context/DataContext";
import PerguntaDialog from "../components/PerguntaDialog";

export default function Perguntas() {
    const { perguntas, deletePergunta } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);

    const [filtroNome, setFiltroNome] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState<"todos" | "ativos" | "inativos">("todos");

    const perguntasFiltradas = useMemo(() => {
        return perguntas
            .filter((p) => {
                const matchNome = p.nome.toLowerCase().includes(filtroNome.toLowerCase());

                const matchAtivo = filtroAtivo === "todos" ? true : filtroAtivo === "ativos" ? p.ativo === true : p.ativo === false;

                return matchNome && matchAtivo;
            })
            .sort((a, b) => a.ordem - b.ordem);
    }, [perguntas, filtroNome, filtroAtivo]);

    const columns: GridColDef[] = [
        { field: "nome", headerName: "Nome", flex: 1 },
        { field: "ordem", headerName: "Ordem", width: 100 },
        {
            field: "ativo",
            headerName: "Ativo",
            width: 100,
            renderCell: (params) => (params.row.ativo ? "Sim" : "Não"),
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        onClick={() => {
                            setEditing(params.row);
                            setOpen(true);
                        }}
                    >
                        Editar
                    </Button>
                    <Button color="error" onClick={() => deletePergunta(params.row.id)}>
                        Excluir
                    </Button>
                </>
            ),
        },
    ];

    return (
        <Box>
            <Box display="flex" gap={2} mb={2}>
                <TextField label="Filtrar por nome" size="small" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} />

                <TextField select size="small" label="Status" value={filtroAtivo} onChange={(e) => setFiltroAtivo(e.target.value as any)} sx={{ width: 150 }}>
                    <MenuItem value="todos">Todos</MenuItem>
                    <MenuItem value="ativos">Ativos</MenuItem>
                    <MenuItem value="inativos">Inativos</MenuItem>
                </TextField>
            </Box>

            <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
                Nova Pergunta
            </Button>

            <DataGrid
                rows={perguntasFiltradas}
                columns={columns}
                autoHeight
                pageSizeOptions={[5]}
                localeText={{
                    noRowsLabel: "Sem perguntas cadastradas",
                }}
            />

            <PerguntaDialog
                open={open}
                pergunta={editing}
                onClose={() => {
                    setOpen(false);
                    setEditing(null);
                }}
            />
        </Box>
    );
}
