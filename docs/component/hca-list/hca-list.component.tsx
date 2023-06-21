import { List, SxProps } from "@mui/material";
import React from "react";
import { Hca } from "../../model/hca.model";
import { HcaListItem, HcaListItemAction } from "./hca-list-item.component";

interface HcaListProps {
    sx?: SxProps;
    hcas: Hca[];
    itemAction?: HcaListItemAction | null;
    avatarContent?: (hca: Hca) => string;
}

export const HcaList = (props: HcaListProps) => {
    const { sx, hcas, itemAction, avatarContent } = props;

    return (
        <List sx={{ width: "100%", bgcolor: "background.paper", ...sx }}>
            {hcas.map((hca) => (
                <HcaListItem
                    key={`hca-list-${hca.ID}`}
                    hca={hca}
                    action={itemAction}
                    avatarContent={avatarContent ? avatarContent(hca) : undefined}
                />
            ))}
        </List>
    );
};
