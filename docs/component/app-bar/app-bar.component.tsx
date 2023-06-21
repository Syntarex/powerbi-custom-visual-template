import { Edit } from "@mui/icons-material";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import Close from "@mui/icons-material/Close";
import Info from "@mui/icons-material/Info";
import Search from "@mui/icons-material/Search";
import Star from "@mui/icons-material/Star";
import TipsAndUpdates from "@mui/icons-material/TipsAndUpdates";
import { IconButton, AppBar as MuiAppBar, Stack, SxProps, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import {
    enableEditIconsAtom,
    favoriteListDrawerOpenAtom,
    hcaDrawerOpenAtom,
    hcaListDrawerOpenAtom,
    siteAtom,
    topHcasDrawerOpenAtom,
} from "../../data/ui.data";
import { routes, useRouteToUrl } from "../../hook/route-to-url.hook";

interface AppBarProps {
    sx?: SxProps;
}

export const AppBar = (props: AppBarProps) => {
    const { sx } = props;

    const [selectedHca, setSelectedHca] = useRecoilState(selectedHcaAtom);
    const resetSelectedHca = useResetRecoilState(selectedHcaAtom);

    const [site, setSite] = useRecoilState(siteAtom);

    const [hcaListDrawerOpen, setHcaListDrawerOpen] = useRecoilState(hcaListDrawerOpenAtom);
    const [favoriteListDrawerOpen, setFavoriteListDrawerOpen] = useRecoilState(favoriteListDrawerOpenAtom);
    const [topHcasDrawerOpen, setTopHcasDrawerOpen] = useRecoilState(topHcasDrawerOpenAtom);

    const [hcaDrawerOpen, setHcaDrawerOpen] = useRecoilState(hcaDrawerOpenAtom);

    const onMarkerButtonClick = useCallback(() => setHcaDrawerOpen(!hcaDrawerOpen), [hcaDrawerOpen, setHcaDrawerOpen]);

    const onStarButtonClick = useCallback(
        () => setFavoriteListDrawerOpen(!favoriteListDrawerOpen),
        [favoriteListDrawerOpen, setFavoriteListDrawerOpen],
    );

    const onMapButtonClick = useCallback(
        () => setHcaListDrawerOpen(!hcaListDrawerOpen),
        [hcaListDrawerOpen, setHcaListDrawerOpen],
    );

    const onBulbButtonClick = useCallback(
        () => setTopHcasDrawerOpen(!topHcasDrawerOpen),
        [topHcasDrawerOpen, setTopHcasDrawerOpen],
    );

    const title = useMemo(() => {
        switch (site) {
            case "home":
                return "Klicke auf einen Bereich um auf diesen zuzugreifen";
            case "map":
                if (!selectedHca) {
                    return "Wähle einen Account";
                }

                return `${selectedHca.NAME} | ${selectedHca.CITY}`;
            case "changes":
                return "Alle Änderungen";
            case "sales":
                return "Alle Verkäufe";
        }
    }, [site, selectedHca]);

    const onBackClick = useCallback(() => {
        setSite("home");
        setSelectedHca(null);
    }, [setSite]);

    const enableEditIcon = useRecoilValue(enableEditIconsAtom);
    const onEditClick = useRouteToUrl(routes.base);

    return (
        <MuiAppBar position={"static"} sx={sx}>
            <Toolbar>
                <Stack sx={{ width: "100%" }} direction={"row"} gap={2} alignItems={"center"}>
                    <Stack sx={{ flexGrow: 1 }} direction={"row"} alignItems={"center"}>
                        {site === "home" ? null : (
                            <Tooltip title={"Zur Übersicht"}>
                                <IconButton color={"inherit"} onClick={onBackClick} size={"large"} edge={"start"}>
                                    <ArrowBack />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Typography variant={"h5"}>{title}</Typography>

                        {!selectedHca || site !== "map" ? null : (
                            <>
                                <Tooltip title={"Auswahl zurücksetzen"}>
                                    <IconButton color={"inherit"} onClick={resetSelectedHca}>
                                        <Close />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={"Zeige Details"}>
                                    <IconButton
                                        size={"large"}
                                        edge={"end"}
                                        color={"inherit"}
                                        onClick={onMarkerButtonClick}
                                    >
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Stack>

                    {site === "map" && (
                        <>
                            <Tooltip title={"Zeige persönliche Favoriten"}>
                                <IconButton size={"large"} edge={"end"} color={"inherit"} onClick={onStarButtonClick}>
                                    <Star />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={"Zeige Top-Accounts nach Fallzahlen"}>
                                <IconButton size={"large"} edge={"end"} color={"inherit"} onClick={onBulbButtonClick}>
                                    <TipsAndUpdates />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title={"Suche Accounts"}>
                                <IconButton size={"large"} edge={"end"} color={"inherit"} onClick={onMapButtonClick}>
                                    <Search />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {site === "home" && enableEditIcon && (
                        <Tooltip title={"Zur Datenverwaltung"}>
                            <IconButton size={"large"} edge={"end"} color={"inherit"} onClick={onEditClick}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Toolbar>
        </MuiAppBar>
    );
};
