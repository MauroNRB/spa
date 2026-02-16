import { useState, useMemo } from "react";
import { Button, Box, TextField, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useData } from "../context/DataContext";
import RespostaDialog from "../components/RespostaDialog";
import type { Resposta } from "../types/models";

export default function Respostas() {
    const { respostas, deleteResposta } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Resposta | undefined>(undefined);

    const [filtroNome, setFiltroNome] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState<"todos" | "ativos" | "inativos">("todos");

    const respostasFiltradas = useMemo(() => {
        return respostas
            .filter((r) => {
                const matchNome = r.nome.toLowerCase().includes(filtroNome.toLowerCase());

                const matchAtivo = filtroAtivo === "todos" ? true : filtroAtivo === "ativos" ? r.ativo === true : r.ativo === false;

                return matchNome && matchAtivo;
            })
            .sort((a, b) => a.ordem - b.ordem);
    }, [respostas, filtroNome, filtroAtivo]);

    const handleClose = () => {
        setOpen(false);
        setEditing(undefined);
    };

    const columns: GridColDef[] = [
        {
            field: "nome",
            headerName: "Nome",
            flex: 1,
        },
        {
            field: "ordem",
            headerName: "Ordem",
            width: 120,
        },
        {
            field: "ativo",
            headerName: "Ativo",
            width: 120,
            renderCell: (params) => (params.row.ativo ? "Sim" : "Não"),
        },
        {
            field: "actions",
            headerName: "Ações",
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        size="small"
                        onClick={() => {
                            setEditing(params.row);
                            setOpen(true);
                        }}
                    >
                        Editar
                    </Button>

                    <Button size="small" color="error" onClick={() => deleteResposta(params.row.id)}>
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
                Nova Resposta
            </Button>

            <DataGrid
                rows={respostasFiltradas}
                columns={columns}
                autoHeight
                pageSizeOptions={[5, 10]}
                localeText={{
                    noRowsLabel: "Sem respostas cadastradas",
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
            />

            <RespostaDialog open={open} resposta={editing} onClose={handleClose} />
        </Box>
    );
}
