import {ChangeEvent, HTMLInputTypeAttribute, useState} from "react";
import {Box, FormHelperText, InputLabel, TextField} from "@mui/material";

type ValidationFn = (value: string) => true | string;

type Props = {
    label: string;
    value: string;
    name?: string;
    autoComplete?: string;
    type?: HTMLInputTypeAttribute;
    onChange: (value: string) => void;
    validate: ValidationFn;
    validateOn?: "change" | "blur";
    placeholder?: string;
};

const Input = ({type = "text", name,
                   label, value, onChange, validate,autoComplete,
                   validateOn = "change", placeholder,
               }: Props) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange(newValue);

        if (validateOn === "change") {
            validateInput(newValue);
        }
    };

    const handleBlur = () => {
        if (validateOn === "blur") {
            validateInput(value);
        }
    };

    const validateInput = (inputValue: string) => {
        const validationResult = validate(inputValue);
        setError(validationResult === true ? null : validationResult);
    };

    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1}}>
            <InputLabel error={!!error} sx={{alignSelf: "flex-start", marginLeft: 1}}>
                {label}
            </InputLabel>
            <TextField
                autoComplete={autoComplete}
                name={name}
                type={type}
                variant="outlined"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                error={!!error}
                fullWidth
            />
            {!!error && (
                <FormHelperText error sx={{marginLeft: 1}}>
                    {error}
                </FormHelperText>
            )}
        </Box>
    );
};

export default Input;
