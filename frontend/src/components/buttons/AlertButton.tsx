import { Button } from "@mui/material";

type Props = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AlertButton = ({ text, onClick }: Props) => {
    return (
        <Button variant="contained" color="error" onClick={onClick}>
            {text}
        </Button>
    );
};

export default AlertButton;
