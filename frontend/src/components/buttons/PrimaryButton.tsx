import { Button } from "@mui/material";

type Props = {
    text: string;
    onClick?: () => void;
};

const PrimaryButton = ({ text, onClick }: Props) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {text}
        </Button>
    );
};

export default PrimaryButton;
