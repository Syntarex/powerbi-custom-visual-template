import { Box, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { floor } from "lodash";
import React from "react";
import { RecoilRoot } from "recoil";
import { Hca } from "../model/hca.model";
import { theme } from "../style/theme.style";
import { AppBar } from "./app-bar/app-bar.component";
import { CursorTooltip } from "./cursor-tooltip/cursor-tooltip.component";
import { DataInitializer } from "./data-initializer/data-initializer.component";
import { FavoriteListDrawer } from "./favorite-list/favorite-list-drawer.component";
import { HcaDrawer } from "./hca-drawer/hca-drawer.component";
import { HcaListDrawer } from "./hca-list/hca-list-drawer.component";
import { Home } from "./home/home.component";
import { TopHcasListDrawer } from "./top-hcas-list/top-hcas-list-drawer.component";

interface MainProps {
    height?: number;
    hcas: Hca[];
}

export const Main = (props: MainProps) => {
    const { height = 500, hcas } = props;

    return (
        <RecoilRoot>
            <DataInitializer hcas={hcas}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />

                    <Box sx={{ height }}>
                        <Stack sx={{ height }}>
                            <CursorTooltip />

                            <AppBar />

                            <Home height={floor(height - 64)} />
                            {/* The AppBar is 64 pixel height. */}

                            <HcaDrawer />

                            <FavoriteListDrawer />
                            <HcaListDrawer />
                            <TopHcasListDrawer />
                        </Stack>
                    </Box>
                </ThemeProvider>
            </DataInitializer>
        </RecoilRoot>
    );
};
