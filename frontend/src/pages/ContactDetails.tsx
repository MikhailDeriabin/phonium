import {useState, useEffect, Dispatch, SetStateAction} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import IconButton from "@/components/buttons/IconButton";
import { Input } from "@/components/inputs";
import { ContactInfoCard, NotFoundCard } from "@/components/cards";
import { BottomBar } from "@/components/bars";
import { ModalDialog } from "@/components/modals";
import Cat from "@/assets/cat-on-phone.webp";
import Wait from "@/assets/wait-a-minute.webp";
import ImageCard from "@/components/cards/ImageCard.tsx";
import { useContactById } from "@/hooks/useContactById";
import { useUpdateContact } from "@/hooks/useUpdateContact";
import { useDeleteContact } from "@/hooks/useDeleteContact";
import {envVars} from "@/utils/envVars.ts";

const validationRules = {
    name: (val: string) => (/^\d/.test(val) ? "Name can't start with a number" : val.length > 50 ? "Max 50 characters" : true),
    phone: (val: string) => (/^\+?\d[\d\s]{3,30}$/.test(val) ? true : "Phone must be 4-31 digits, may start with +, and can include spaces"),
    description: (val: string) => (val.length > 200 ? "Max 200 characters" : true),
};

const ContactDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: response, isLoading } = useContactById(Number(id));
    const contact = response?.data;

    const updateContact = useUpdateContact();
    const deleteContactMutation = useDeleteContact();

    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (contact) {
            setName(contact.name || "");
            setPhone(contact.phone || "");
            setDescription(contact.description || "");
        }
    }, [contact]);

    const handleDelete = () => {
        deleteContactMutation.mutate(Number(id), { onSuccess: () => navigate("/") });
    };

    const handleSave = () => {
        const fields: Record<string, string> = {name, phone, description};

        for (const field in validationRules) {
            const validationResult = validationRules[field](fields[field]);

            if (validationResult !== true)
                return;
        }

        const fieldsToSave = Object.fromEntries(
            Object.entries(fields).filter(([_, value]) => value !== null && value !== "")
        ) as any;

        updateContact.mutate({ id: Number(id), ...fieldsToSave });
        setIsEditing(false);
    };

    const handleModalClose = (modalSetter: Dispatch<SetStateAction<boolean>>, action?: string) => {
        if (action === "ok" && modalSetter === setIsDeleteModalOpen) handleDelete();
        modalSetter(false);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>
        );
    }

    if (!contact)
        return <NotFoundCard errorText="Could not find the contact" />;

    const renderContactEdit = () => (
        <Box display="flex" flexDirection="column" gap={2}>
            <Input label="Name" value={name} onChange={setName} validate={validationRules.name} validateOn="change" placeholder="Enter name (optional)" />
            <Input label="Phone" value={phone} onChange={setPhone} validate={validationRules.phone} validateOn="change" placeholder="Enter phone (required)" />
            <Input label="Description" value={description} onChange={setDescription} validate={validationRules.description} validateOn="change" placeholder="Enter description (optional)" />
        </Box>
    );

    return (
        <Box>
            <Box sx={{ maxWidth: 500, margin: "auto", padding: "16px" }}>
                {isEditing ? renderContactEdit() : <ContactInfoCard contact={contact} />}
            </Box>

            <ModalDialog openTrigger={isDeleteModalOpen} title="Are you sure?" onClose={(action) => handleModalClose(setIsDeleteModalOpen, action)}>
                <Typography>You are about to delete {contact.name || "Unknown Contact"}.</Typography>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <ImageCard alt="cat talking on the phone" src={Wait} width={300} />
                </Box>
            </ModalDialog>

            <ModalDialog openTrigger={isCallModalOpen} title="You are calling" onClose={() => setIsCallModalOpen(false)}>
                <Typography variant="h6">{contact.name || "Unknown Contact"}</Typography>
                <Typography variant="body1">{contact.phone}</Typography>
                <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <ImageCard alt="cat talking on the phone" src={Cat} width={200} />
                </Box>
            </ModalDialog>

            <BottomBar
                leftButton={isEditing ? <IconButton icon="close" onClick={() => setIsEditing(false)} /> : <IconButton icon="delete" onClick={() => setIsDeleteModalOpen(true)} />}
                middleButton={isEditing ? null : <IconButton icon="phone" onClick={() => setIsCallModalOpen(true)} />}
                rightButton={isEditing ? <IconButton icon="save" onClick={handleSave} /> : <IconButton icon="modify" onClick={() => setIsEditing(true)} />}
            />
        </Box>
    );
};

export default ContactDetails;
