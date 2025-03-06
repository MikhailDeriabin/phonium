import { Button } from "@mui/material";

type Props = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DisabledButton = ({ text, onClick }: Props) => {
    return (
        <Button variant="contained" color="primary" disabled onClick={onClick}>
            {text}
        </Button>
    );
};

export default DisabledButton;
