import { AppBar, Box, Stack, SxProps, Toolbar, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface HomeWidgetProps {
    sx?: SxProps;
    headline?: string;
    hoverText?: string;
    children: ReactNode;
    onClick?: () => void;
}

export const HomeWidget = (props: HomeWidgetProps) => {
    const { sx, headline, hoverText, children, onClick } = props;

    const [hovered, setHovered] = useState(false);

    return (
        <Stack
            sx={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", ...sx }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            {!headline ? null : (
                <AppBar position={"static"} color={"secondary"}>
                    <Toolbar variant={"dense"}>
                        <Typography sx={{ flexGrow: 1 }} variant={"h6"}>
                            {headline}
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            <Box sx={{ height: "100%" }}>
                {!hoverText ? null : (
                    <Stack
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: "100%",
                            opacity: hovered ? 1 : 0,
                            zIndex: 1000,
                            backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Typography variant={"h3"} color={"white"}>
                            {hoverText}
                        </Typography>
                    </Stack>
                )}

                {children}
            </Box>
        </Stack>
    );
};
