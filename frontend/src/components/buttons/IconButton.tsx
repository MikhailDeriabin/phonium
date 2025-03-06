import { IconButton as MuiIconButton } from "@mui/material";
import { Add, Edit, Delete, Save, Close, ArrowBack, Phone } from "@mui/icons-material";

type IconType = "add" | "modify" | "delete" | "save" | "close" | "back" | "phone";

type Props = {
    icon: IconType;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = ({ icon, onClick }: Props) => {
    const isErrorButton = icon === "delete" || icon === "close";

    const getIcon = () => {
        switch (icon) {
            case "add":
                return <Add />;
            case "modify":
                return <Edit />;
            case "delete":
                return <Delete />;
            case "save":
                return <Save />;
            case "close":
                return <Close />;
            case "back":
                return <ArrowBack />;
            case "phone":
                return <Phone />;
            default:
                return null;
        }
    };

    return (
        <MuiIconButton
            onClick={onClick}
            color={isErrorButton ? "error" : "primary"}
            sx={{
                "&:hover": {
                    color: isErrorButton ? "error.main" : "primary.main",
                },
            }}
        >
            {getIcon()}
        </MuiIconButton>
    );
};

export default IconButton;
