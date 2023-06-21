import { Edit } from "@mui/icons-material";
import Close from "@mui/icons-material/Close";
import { Divider, IconButton, Drawer as MuiDrawer, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { enableEditIconsAtom } from "../../data/ui.data";
import { useRouteToUrl } from "../../hook/route-to-url.hook";

interface DrawerProps {
    sx?: SxProps;
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    headline: string;
    width?: number;
    editUrl?: string;
}

/** A generic drawer with close icon and headline. */
export const Drawer = (props: DrawerProps) => {
    const { sx, open, onClose, children, headline, width = 500, editUrl } = props;

    const selectedHca = useRecoilValue(selectedHcaAtom);

    // Closes the drawer if the selected hca changes
    useEffect(() => onClose(), [selectedHca, onClose]);

    const enableEditIcons = useRecoilValue(enableEditIconsAtom);
    const routeToEditUrl = useRouteToUrl(editUrl);

    return (
        <MuiDrawer open={open} onClose={onClose} anchor={"right"}>
            <Stack sx={{ width, ...sx }} padding={2} gap={2}>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <Typography variant={"h5"}>{headline}</Typography>

                        {!editUrl || !enableEditIcons ? null : (
                            <Tooltip title={"Bearbeiten"}>
                                <IconButton sx={{ ml: 1 }} onClick={routeToEditUrl}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>

                    <Tooltip title={"Schließen"}>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Divider />

                {children}
            </Stack>
        </MuiDrawer>
    );
};
