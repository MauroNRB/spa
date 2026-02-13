import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useData } from "../context/DataContext";
import PerguntaDialog from "../components/PerguntaDialog";

export default function Perguntas() {
    const { perguntas, deletePergunta } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);

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
            <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
                Nova Pergunta
            </Button>

            <DataGrid
                rows={[...perguntas].sort((a, b) => a.ordem - b.ordem)}
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
