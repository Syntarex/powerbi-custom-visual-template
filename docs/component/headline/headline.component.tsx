import { Edit } from "@mui/icons-material";
import { IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { enableEditIconsAtom } from "../../data/ui.data";
import { useRouteToUrl } from "../../hook/route-to-url.hook";

export interface HeadlineProps {
    sx?: SxProps;
    children: ReactNode;
    editUrl?: string;
    editTooltip?: string;
}

export const Headline = (props: HeadlineProps) => {
    const { children, editUrl, sx, editTooltip = "Bearbeiten" } = props;

    const enableEditIcons = useRecoilValue(enableEditIconsAtom);
    const routeToEditUrl = useRouteToUrl(editUrl);

    return (
        <Stack direction={"row"} sx={{ flexWrap: "nowrap", alignItems: "center", ...sx }}>
            <Typography variant={"h5"}>{children}</Typography>

            {!editUrl || !enableEditIcons ? null : (
                <Tooltip title={editTooltip}>
                    <IconButton sx={{ ml: 1 }} onClick={routeToEditUrl}>
                        <Edit />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
};
