import { SxProps } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { localHcasSelector } from "../../data/hca.data";
import { hcaListDrawerOpenAtom } from "../../data/ui.data";
import { useSearchHcas } from "../../hook/search-hcas.hook";
import { Drawer } from "../drawer/drawer.component";
import { SearchHcasInput } from "../search-hcas-input/search-hcas-input.component";
import { HcaList } from "./hca-list.component";

interface HcaListDrawerProps {
    sx?: SxProps;
}

/** A drawer which shows a list of all hcas which are present on the map. */
export const HcaListDrawer = (props: HcaListDrawerProps) => {
    const { sx } = props;

    const [searchQuery, setSearchQuery] = useState("");

    const hcasOnMap = useRecoilValue(localHcasSelector);

    const filteredHcas = useSearchHcas(hcasOnMap, searchQuery);

    const [drawerOpen, setDrawerOpen] = useRecoilState(hcaListDrawerOpenAtom);
    const onDrawerClose = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

    // Clear search query if drawer opens or closes
    useEffect(() => setSearchQuery(""), [drawerOpen]);

    return (
        <Drawer sx={sx} open={drawerOpen} onClose={onDrawerClose} headline={"Durchsuche Accounts"}>
            <SearchHcasInput value={searchQuery} onChange={setSearchQuery} />

            <HcaList hcas={filteredHcas} />
        </Drawer>
    );
};
