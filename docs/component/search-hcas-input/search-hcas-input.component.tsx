import { Box, SxProps, TextField } from "@mui/material";
import React, { useCallback } from "react";

interface SearchHcasInputProps {
    sx?: SxProps;
    value: string;
    onChange: (value: string) => void;
}

export const SearchHcasInput = (props: SearchHcasInputProps) => {
    const { sx, value, onChange } = props;

    const onInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
        [onChange],
    );

    return (
        <Box sx={sx}>
            <TextField
                fullWidth
                variant={"outlined"}
                value={value}
                onChange={onInput}
                label={"Durchsuche Accounts"}
                helperText={"Suche nach Name oder Adresse."}
            />
        </Box>
    );
};
