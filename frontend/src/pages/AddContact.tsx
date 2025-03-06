import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Box} from "@mui/material";
import {Input} from "@/components/inputs";
import {BottomBar} from "@/components/bars";
import {IconButton} from "@/components/buttons";
import {useAddContact} from "@/hooks/useAddContact.tsx";

const validationRules: Record<string, (val: string) => string | true> = {
    name: (val: string) => (/^\d/.test(val) ? "Name can't start with a number" : val.length > 50 ? "Max 50 characters" : true),
    phone: (val: string) => (/^\+?\d[\d\s]{3,30}$/.test(val) ? true : "Phone must be 4-31 digits, may start with +, and can include spaces"),
    description: (val: string) => (val.length > 200 ? "Max 200 characters" : true)
};

const AddContact = () => {
    const navigate = useNavigate();
    const addContactMutation = useAddContact();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");

    const [backendError, setBackendError] = useState("");

    const navigateBack = () => {
        navigate("/")
    }

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

        addContactMutation.mutate(
            fieldsToSave,
            {
                onSuccess: navigateBack,
                onError: (error: Error) => {
                    setBackendError(error.message);
                }
            }
        );
    };


    return (
        <Box>
            <Box sx={{maxWidth: "500px", margin: "auto", display: "flex", flexDirection: "column", gap: 2}}>
                <Input
                    autoComplete="name"
                    label="Name"
                    value={name}
                    onChange={setName}
                    validate={validationRules.name}
                    placeholder="John Doe"
                />

                <Input
                    type="tel"
                    label="Phone"
                    value={phone}
                    onChange={setPhone}
                    validate={validationRules.phone}
                    placeholder="+358 045 123 456"
                />

                <Input
                    type={"text"}
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    validate={validationRules.description}
                    placeholder="A cool guy"
                />
            </Box>

            {backendError && <Alert severity="error">{backendError}</Alert>}

            <BottomBar
                leftButton={<IconButton icon="close" onClick={navigateBack}/>}
                rightButton={<IconButton icon="save" onClick={handleSave}/>}
            />
        </Box>
    );
};

export default AddContact;
