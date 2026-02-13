import { Typography, Box, Card, CardContent, FormGroup, FormControlLabel, Checkbox, Button, Stack } from "@mui/material";
import { useData } from "../context/DataContext";
import { useMemo, useState } from "react";

export default function Main() {
    const { perguntas, respostas } = useData();

    const perguntasAtivas = useMemo(() => [...perguntas].filter((p) => p.ativo).sort((a, b) => a.ordem - b.ordem), [perguntas]);

    const respostasMap = useMemo(() => {
        const map: Record<string, string> = {};
        respostas.forEach((r) => {
            map[r.id] = r.nome;
        });
        return map;
    }, [respostas]);

    const [selecionadas, setSelecionadas] = useState<Record<string, string[]>>({});

    const toggleResposta = (perguntaId: string, respostaId: string) => {
        setSelecionadas((prev) => {
            const atual = prev[perguntaId] || [];
            const novaLista = atual.includes(respostaId) ? atual.filter((id) => id !== respostaId) : [...atual, respostaId];

            return { ...prev, [perguntaId]: novaLista };
        });
    };

    const exportarTxt = () => {
        let conteudo = "RESPOSTAS DO QUESTIONÁRIO\n\n";

        perguntasAtivas.forEach((p, index) => {
            conteudo += `${index + 1}. ${p.nome}\n`;

            const marcadas = selecionadas[p.id] || [];

            if (marcadas.length === 0) {
                conteudo += "   (Nenhuma resposta selecionada)\n\n";
            } else {
                marcadas.forEach((rid) => {
                    conteudo += `   - ${respostasMap[rid]}\n`;
                });
                conteudo += "\n";
            }
        });

        const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "respostas.txt";
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Questionário
            </Typography>

            <Stack spacing={3}>
                {perguntasAtivas.map((p) => (
                    <Card key={p.id}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {p.nome}
                            </Typography>

                            <FormGroup>
                                {p.respostasIds.map((rid) => (
                                    <FormControlLabel key={rid} control={<Checkbox checked={(selecionadas[p.id] || []).includes(rid)} onChange={() => toggleResposta(p.id, rid)} />} label={respostasMap[rid] || "Resposta removida"} />
                                ))}
                            </FormGroup>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            {perguntasAtivas.length > 0 && (
                <Box mt={4}>
                    <Button variant="contained" size="large" onClick={exportarTxt}>
                        Exportar Respostas (.txt)
                    </Button>
                </Box>
            )}
        </Box>
    );
}
