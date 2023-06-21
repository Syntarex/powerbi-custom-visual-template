import { Paper, SxProps, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { favoriteHcasSelector } from "../../data/favorite.data";
import { HcaList } from "../hca-list/hca-list.component";

interface FavoriteHcasPanelProps {
    sx?: SxProps;
}

export const FavoriteHcasPanel = (props: FavoriteHcasPanelProps) => {
    const { sx } = props;

    const [nonDoctorOffices, doctorOffices] = useRecoilValue(favoriteHcasSelector);

    const favorites = useMemo(() => [...nonDoctorOffices, ...doctorOffices], [nonDoctorOffices, doctorOffices]);

    return (
        <Paper elevation={5} sx={sx}>
            {isEmpty(favorites) ? (
                <Typography>
                    Es gibt keine Favoriten für diesen Account. Klicke hier und anschließend auf Bearbeiten, um
                    Favoriten zu bearbeiten.
                </Typography>
            ) : (
                <>{isEmpty(favorites) ? null : <HcaList hcas={favorites} />}</>
            )}
        </Paper>
    );
};
