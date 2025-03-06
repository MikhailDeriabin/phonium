import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, CardContent, Typography} from "@mui/material";
import IconButton from "@/components/buttons/IconButton";
import {ModalDialog} from "@/components/modals";
import ImageCard from "@/components/cards/ImageCard.tsx";
import Cat from "@/assets/cat-on-phone.webp";

type Props = {
    contact: Contact;
};

const ContactCard = ({contact}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    cursor: "pointer",
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
                onClick={() => navigate(`/contact/${contact.id}`)}
            >
                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant="h6">{contact.name || contact.phone}</Typography>
                </CardContent>
                <IconButton
                    icon="phone"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleOpenModal();
                    }}
                />
            </Card>

            <ModalDialog openTrigger={isModalOpen} title="You are calling" onClose={handleCloseModal}>
                <Typography variant="h6">{contact.name || "Unknown Contact"}</Typography>
                <Typography variant="body1">{contact.phone}</Typography>
                <Box sx={{display: "flex", justifyContent: "right"}}>
                    <ImageCard alt="cat talking on the phone" src={Cat} width={200}/>
                </Box>
            </ModalDialog>
        </>
    );
};

export default ContactCard;
