import { SxProps, Typography, useTheme } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { favoriteHcasSelector } from "../../data/favorite.data";
import { Hca } from "../../model/hca.model";
import { HcaList } from "../hca-list/hca-list.component";

interface FavoriteListProps {
    sx?: SxProps;
    hideActions?: boolean;
    hcas?: Hca[];
    hideIntroduction?: boolean;
}

export const FavoriteList = (props: FavoriteListProps) => {
    const { sx, hideActions, hcas = [], hideIntroduction } = props;

    const theme = useTheme();

    const [nonDoctorOffices, doctorOffices] = useRecoilValue(favoriteHcasSelector);

    return (
        <>
            {hideIntroduction ? null : (
                <Typography>
                    Favoriten haben einen{" "}
                    <Typography component={"span"} sx={{ fontWeight: 500, color: theme.palette.secondary.main }}>
                        grünen
                    </Typography>{" "}
                    Marker auf der Karte.
                </Typography>
            )}

            {(!isEmpty(hcas) ? hcas : [...nonDoctorOffices, ...doctorOffices]) ? (
                <Typography>
                    Es gibt keine Favoriten für diesen Account. Gehe auf Bearbeiten, um Favoriten zu bearbeiten.
                </Typography>
            ) : (
                <HcaList sx={sx} hcas={hcas} itemAction={hideActions ? null : undefined} />
            )}
        </>
    );
};
