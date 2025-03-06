import {Box} from "@mui/material";
import {ReactNode} from "react";

type Props = {
    leftButton?: ReactNode;
    middleButton?: ReactNode;
    rightButton?: ReactNode;
};

const BottomBar = ({leftButton, middleButton, rightButton}: Props) => {
    if (!leftButton && !middleButton && !rightButton)
        return <></>;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: `alpha(theme.palette.background.default, 0.5)`,
                backdropFilter: "blur(5px)",
                display: "flex",
                justifyContent: "center",
                padding: "10px 0",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "500px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 16px",
                }}
            >
                <Box sx={{flex: 1, textAlign: "left"}}>{leftButton}</Box>

                <Box sx={{flex: 1, textAlign: "center"}}>{middleButton}</Box>

                <Box sx={{flex: 1, textAlign: "right"}}>{rightButton}</Box>
            </Box>
        </Box>
    );
};

export default BottomBar;
