import { Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { exampleTextsAtom } from "../data/example.data";
import { useSearchExampleTexts } from "../hook/example.hook";

export const Example = () => {
    const exampleTexts = useRecoilValue(exampleTextsAtom);

    const [searchQuery, setSearchQuery] = useState("");

    const searchResults = useSearchExampleTexts(searchQuery);

    return (
        <Stack gap={4}>
            <TextField
                variant={"outlined"}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value ?? "")}
                label={"Suche"}
            />

            {exampleTexts.map((text, index) => (
                <Typography
                    key={`text-${index}`}
                    fontWeight={searchQuery && searchResults.indexOf(index) > -1 ? 500 : undefined}
                >
                    {text}
                </Typography>
            ))}
        </Stack>
    );
};
