import { useTheme } from "@/context/ThemeContext.tsx";
import {IconButton} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";

const ThemeToggle = () => {
    const { mode, toggleTheme } = useTheme();

    return (
        <IconButton onClick={toggleTheme} color="primary">
            {mode === "light" ? <DarkMode/> : <LightMode/>}
        </IconButton>
    );
};

export default ThemeToggle;
