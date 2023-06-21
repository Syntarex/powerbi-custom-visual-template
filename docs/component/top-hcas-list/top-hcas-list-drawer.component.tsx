import { Divider, SxProps, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { btcRankingSelector, hccRankingSelector } from "../../data/hca.data";
import { topHcasDrawerOpenAtom } from "../../data/ui.data";
import { Drawer } from "../drawer/drawer.component";
import { HcaList } from "../hca-list/hca-list.component";

interface TopHcasListDrawerProps {
    sx?: SxProps;
}

export const TopHcasListDrawer = (props: TopHcasListDrawerProps) => {
    const { sx } = props;

    const hccRankedHcas = useRecoilValue(hccRankingSelector);
    const btcRankedHcas = useRecoilValue(btcRankingSelector);

    const [drawerOpen, setDrawerOpen] = useRecoilState(topHcasDrawerOpenAtom);
    const onDrawerClose = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

    return (
        <Drawer sx={sx} open={drawerOpen} onClose={onDrawerClose} headline={"Top-Accounts nach Fallzahlen"}>
            <Typography variant={"h5"}>Top 5 HCC</Typography>
            <HcaList
                sx={sx}
                hcas={hccRankedHcas}
                avatarContent={(hca) => (hca.POTENTIAL?.RANK_HCC ?? hca.NAME.charAt(0)).toString()}
            />

            <Divider />

            <Typography variant={"h5"}>Top 5 BTC</Typography>
            <HcaList
                sx={sx}
                hcas={btcRankedHcas}
                avatarContent={(hca) => (hca.POTENTIAL?.RANK_BTC ?? hca.NAME.charAt(0)).toString()}
            />
        </Drawer>
    );
};
