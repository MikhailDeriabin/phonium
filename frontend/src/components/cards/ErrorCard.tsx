import {Box, Typography} from "@mui/material";
import ImageCard from "@/components/cards/ImageCard.tsx";
import Cat from "@/assets/sad-cat.webp";

type Props = {
    errorText: string;
};

const ErrorCard = ({errorText}: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <ImageCard alt="sad cat" src={Cat} width={200}/>
            <Typography variant="h6">{errorText}</Typography>
        </Box>
    );
};

export default ErrorCard;