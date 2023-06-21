import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { RecoilRoot } from "recoil";
import { theme } from "../style/theme.style";
import { Example } from "./example.component";

interface MainProps {
    height?: number;
}

export const Main = (props: MainProps) => {
    const { height = 500 } = props;

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Box sx={{ height }}>
                    <Example />
                </Box>
            </ThemeProvider>
        </RecoilRoot>
    );
};
