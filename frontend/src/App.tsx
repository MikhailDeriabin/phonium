import './App.css';
import {ThemeProvider} from "@/context/ThemeContext.tsx";
import {CssBaseline} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
            <CssBaseline/>
            <RouterProvider router={router}/>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
