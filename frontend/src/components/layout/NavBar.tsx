import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import IconButton from "@/components/buttons/IconButton.tsx";
import {ThemeToggle} from "@/components/buttons";

type Props = {
    title: string;
    showBackButton?: boolean;
};

const NavBar = ({ title, showBackButton = true }: Props) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="default" sx={{ boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Left Side: Back Button */}
                {showBackButton ? (
                    <Box sx={{ flex: 1 }}>
                        <IconButton icon="back" onClick={() => navigate(-1)} />
                    </Box>
                ) : (
                    <Box sx={{ flex: 1 }} />
                )}

                {/* Center: Title */}
                <Typography variant="h6" sx={{ flex: 2, textAlign: "center" }}>
                    {title}
                </Typography>

                {/* Right Side: Theme Toggle */}
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <ThemeToggle />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
