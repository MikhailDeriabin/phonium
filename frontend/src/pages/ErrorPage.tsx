import { useRouteError, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {NotFoundCard} from "@/components/cards";
import {PrimaryButton} from "@/components/buttons";

const ErrorPage = () => {
    const error = useRouteError() as any;
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <NotFoundCard errorText="Sowwy, we are having problems" />

            {error && (
                <Typography variant="body2" color="error" sx={{ margin: 1 }}>
                    Error reason: {error.statusText || error.message}
                </Typography>
            )}

            <PrimaryButton text="Go Back" onClick={() => navigate(-1)}/>
        </Box>
    );
};

export default ErrorPage;
