import { SxProps, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { favoriteHcasSelector } from "../../data/favorite.data";
import { favoriteListDrawerOpenAtom } from "../../data/ui.data";
import { routes } from "../../hook/route-to-url.hook";
import { Drawer } from "../drawer/drawer.component";
import { HcaList } from "../hca-list/hca-list.component";

interface FavoriteListDrawerProps {
    sx?: SxProps;
}

export const FavoriteListDrawer = (props: FavoriteListDrawerProps) => {
    const { sx } = props;

    const [drawerOpen, setDrawerOpen] = useRecoilState(favoriteListDrawerOpenAtom);
    const onDrawerClose = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

    const [nonDoctorOffices, doctorOffices] = useRecoilValue(favoriteHcasSelector);

    return (
        <Drawer
            sx={sx}
            open={drawerOpen}
            onClose={onDrawerClose}
            editUrl={routes.editFavorites()}
            headline={"Favoriten"}
        >
            {isEmpty(nonDoctorOffices) && isEmpty(doctorOffices) ? (
                <Typography>
                    Es gibt keine Favoriten für diesen Account. Gehe auf Bearbeiten, um Favoriten zu bearbeiten.
                </Typography>
            ) : (
                <>
                    {isEmpty(nonDoctorOffices) ? null : (
                        <>
                            <Typography variant={"h5"}>Kliniken/Zentren</Typography>
                            <HcaList hcas={nonDoctorOffices} />
                        </>
                    )}

                    {isEmpty(doctorOffices) ? null : (
                        <>
                            <Typography variant={"h5"}>Praxen</Typography>
                            <HcaList hcas={doctorOffices} />
                        </>
                    )}
                </>
            )}
        </Drawer>
    );
};
