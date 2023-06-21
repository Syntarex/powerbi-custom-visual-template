import FormatListNumbered from "@mui/icons-material/FormatListNumbered";
import Info from "@mui/icons-material/Info";
import Insights from "@mui/icons-material/Insights";
import Store from "@mui/icons-material/Store";
import { SxProps, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { hcaDrawerOpenAtom } from "../../data/ui.data";
import { ConnectedHcasList } from "../connected-hcas-list/connected-hcas-list.component";
import { HcaChangelog } from "../hca-changelog/hca-changelog.component";
import { HcaDetails } from "../hca-details/hca-details.component";
import { Sales } from "../sales/sales.component";
import { DrawerTab, TabsDrawer } from "../tabs-drawer/tabs-drawer.component";

interface HcaDrawerProps {
    sx?: SxProps;
}

export const HcaDrawer = (props: HcaDrawerProps) => {
    const { sx } = props;

    const [open, setOpen] = useRecoilState(hcaDrawerOpenAtom);
    const onClose = useCallback(() => setOpen(false), [setOpen]);

    const hca = useRecoilValue(selectedHcaAtom);

    /* Close drawer on HCA change */
    useEffect(() => setOpen(false), [setOpen, hca]);

    const tabs: DrawerTab[] = useMemo(() => {
        if (!hca) {
            return [
                {
                    title: "Kein HCA ausgewählt",
                    component: <Typography>Kein HCA ausgewählt.</Typography>,
                },
            ];
        }

        const tabs: DrawerTab[] = [
            {
                title: "Details",
                component: <HcaDetails />,
                tooltip: "Zeige alle Details",
                icon: <Info />,
            },
        ];

        if (!isEmpty(hca.SALES)) {
            tabs.push({
                title: "Verkäufe",
                component: <Sales hca={hca} />,
                tooltip: "Zeige IMFINZI Direct Sales",
                icon: <Insights />,
            });
        }

        if (!isEmpty(hca.CHANGES)) {
            tabs.push({
                title: "Änderungen",
                component: <HcaChangelog hca={hca} />,
                tooltip: "Zeige Änderungen",
                icon: <FormatListNumbered />,
            });
        }

        tabs.push({
            title: "Versorgungsnetzwerk",
            component: <ConnectedHcasList />,
            tooltip: "Zeige Versorgungsnetzwerk",
            icon: <Store />,
        });

        return tabs;
    }, [hca]);

    return (
        <TabsDrawer sx={sx} width={800} tabs={tabs} open={open && !!hca} onClose={onClose} listenToForTabReset={hca} />
    );
};
