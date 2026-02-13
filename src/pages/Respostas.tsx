import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useData } from "../context/DataContext";
import RespostaDialog from "../components/RespostaDialog";
import type { Resposta } from "../types/models";

export default function Respostas() {
    const { respostas, deleteResposta } = useData();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Resposta | undefined>(undefined);

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
            <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpen(true)}>
                Nova Resposta
            </Button>

            <DataGrid
                rows={[...respostas].sort((a, b) => a.ordem - b.ordem)}
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
