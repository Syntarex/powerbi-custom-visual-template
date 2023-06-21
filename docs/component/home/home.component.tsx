import { Stack } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { allSalesSelector } from "../../data/hca.data";
import { favoriteListDrawerOpenAtom, siteAtom } from "../../data/ui.data";
import { FavoriteHcasPanel } from "../favorite-hcas-panel/favorite-hcas-panel.component";
import { HcaChangelog } from "../hca-changelog/hca-changelog.component";
import { HomeWidget } from "../home-widget/home-widget.component";
import { Map } from "../map/map.component";
import { SalesGraph } from "../sales-graph/sales-graph.component";
import { Sales } from "../sales/sales.component";

interface HomeProps {
    height?: number;
}

export const Home = (props: HomeProps) => {
    const { height = 600 } = props;

    const [site, setSite] = useRecoilState(siteAtom);
    const setFavoriteDrawerOpen = useSetRecoilState(favoriteListDrawerOpenAtom);
    const allSales = useRecoilValue(allSalesSelector);

    const homeWidgetHeight = useMemo(() => height / 2 - 48, [height]);

    if (site === "map") {
        return <Map sx={{ flexGrow: 1 }} />;
    }

    if (site === "changes") {
        return <HcaChangelog />;
    }

    if (site === "sales") {
        return <Sales />;
    }

    if (site === "home") {
        return (
            <Stack sx={{ maxHeight: height }}>
                <Stack
                    marginTop={4}
                    sx={{ height: "100%", maxHeight: homeWidgetHeight, flexGrow: 0 }}
                    direction={"row"}
                    gap={4}
                >
                    <HomeWidget
                        headline={"Account Übersicht & Datenverwaltung"}
                        onClick={() => setSite("map")}
                        hoverText={"Zur Karte"}
                    >
                        <Map disabled sx={{ height: homeWidgetHeight - 48 }} />
                    </HomeWidget>

                    <HomeWidget
                        headline={"Änderungshistorie deiner Accounts"}
                        onClick={() => setSite("changes")}
                        hoverText={"Zu Änderungen"}
                    >
                        <HcaChangelog height={homeWidgetHeight - 48} />
                    </HomeWidget>
                </Stack>

                <Stack
                    marginTop={4}
                    sx={{ height: "100%", maxHeight: homeWidgetHeight, flexGrow: 0 }}
                    direction={"row"}
                    gap={4}
                >
                    <HomeWidget
                        sx={{
                            maxWidth: 614,
                        }}
                        headline={"Persönliche Favoriten"}
                        hoverText={"Zu Favoriten"}
                        onClick={() => {
                            setFavoriteDrawerOpen(true);
                            setSite("map");
                        }}
                    >
                        <FavoriteHcasPanel />
                    </HomeWidget>

                    {isEmpty(allSales) ? null : (
                        <HomeWidget
                            headline={"Direct Sales"}
                            hoverText={"Zu Verkäufen"}
                            onClick={() => setSite("sales")}
                        >
                            <SalesGraph hideControls height={homeWidgetHeight - 48} />
                        </HomeWidget>
                    )}
                </Stack>
            </Stack>
        );
    }

    return null;
};
