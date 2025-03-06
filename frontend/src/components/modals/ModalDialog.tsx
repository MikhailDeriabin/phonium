import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import {AlertButton, PrimaryButton} from "@/components/buttons";

type Props = {
    openTrigger: boolean;
    title: string;
    children: React.ReactNode;
    okText?: string;
    cancelText?: string;
    onClose: (action: "ok" | "cancel") => void;
};

const ModalDialog = ({ openTrigger, title, children, okText = "OK", cancelText = "Cancel", onClose }: Props) => {
    return (
        <Dialog open={openTrigger} onClose={() => onClose("cancel")} fullWidth>
            <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
                <AlertButton onClick={() => onClose("cancel")} text={cancelText}/>
                <PrimaryButton onClick={() => onClose("ok")} text={okText} />
            </DialogActions>
        </Dialog>
    );
};

export default ModalDialog;
