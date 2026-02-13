import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Main from "./pages/Main";
import Perguntas from "./pages/Perguntas";
import Respostas from "./pages/Respostas";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Sistema Q&A
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Inicial
                        </Button>
                        <Button color="inherit" component={Link} to="/perguntas">
                            Perguntas
                        </Button>
                        <Button color="inherit" component={Link} to="/respostas">
                            Respostas
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/perguntas" element={<Perguntas />} />
                        <Route path="/respostas" element={<Respostas />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
