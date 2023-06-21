import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, SxProps, Tooltip } from "@mui/material";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hoveredHcaAtom, selectedHcaAtom } from "../../data/hca.data";
import { Hca } from "../../model/hca.model";

export interface HcaListItemAction {
    tooltipText: string;
    icon?: React.ReactNode;
    onClick: (hca: Hca) => void;
}

interface HcaListItemProps {
    sx?: SxProps;
    hca: Hca;
    action?: HcaListItemAction | null;
    avatarContent?: string;
}

export const HcaListItem = (props: HcaListItemProps) => {
    const setSelectedHca = useSetRecoilState(selectedHcaAtom);

    const [hoveredHca, setHoveredHca] = useRecoilState(hoveredHcaAtom);

    const { sx, hca, action, avatarContent } = props;

    return (
        <Tooltip title={"Account auf der Karte anzeigen"}>
            <ListItem
                sx={{
                    bgcolor: (theme) =>
                        hoveredHca?.ID === hca.ID ? theme.palette.grey[200] : theme.palette.background.paper,
                    ...sx,
                }}
                onMouseOver={() => setHoveredHca(hca)}
                onMouseOut={() => setHoveredHca(null)}
                secondaryAction={
                    !action ? undefined : (
                        <Tooltip title={action.tooltipText}>
                            <IconButton edge={"end"} onClick={() => action.onClick(hca)}>
                                {action.icon}
                            </IconButton>
                        </Tooltip>
                    )
                }
                onClick={() => setSelectedHca(hca)}
            >
                <ListItemAvatar>
                    <Avatar>{avatarContent ?? hca.NAME.charAt(0)}</Avatar>
                </ListItemAvatar>

                <ListItemText
                    primary={hca.NAME}
                    secondary={`${hca.TYPE} | ${hca.STREET} ${hca.HOUSENUMBER} | ${hca.ZIPCODE} ${hca.CITY}`}
                />
            </ListItem>
        </Tooltip>
    );
};
