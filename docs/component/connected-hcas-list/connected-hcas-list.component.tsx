import { Stack, SxProps, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { connectedHcasSelector } from "../../data/route.data";
import { routes } from "../../hook/route-to-url.hook";
import { HcaList } from "../hca-list/hca-list.component";
import { Headline } from "../headline/headline.component";

interface ConnectedHcasListProps {
    sx?: SxProps;
}

export const ConnectedHcasList = (props: ConnectedHcasListProps) => {
    const { sx } = props;

    const [patients, goods] = useRecoilValue(connectedHcasSelector);
    const selectedHca = useRecoilValue(selectedHcaAtom);

    if (!selectedHca) {
        return null;
    }

    return (
        <Stack gap={2} sx={sx}>
            <Headline editUrl={routes.editRoutes(selectedHca.ID)}>Warenbelieferung von</Headline>
            {isEmpty(goods) ? (
                <Typography>
                    Es gibt kein Warenbelieferung für diesen Account. Gehe auf Bearbeiten, um eine Warenbeziehung
                    einzugeben
                </Typography>
            ) : (
                <HcaList hcas={goods} />
            )}

            <Headline editUrl={routes.editRoutes(selectedHca.ID)}>Versorgungsnetzwerk</Headline>
            {isEmpty(patients) ? (
                <Typography>
                    Es gibt kein Versorgungsnetzwerk für diesen Account. Gehe auf Bearbeiten, um eine
                    Versorgungsbeziehung einzugeben
                </Typography>
            ) : (
                <HcaList hcas={patients} />
            )}
        </Stack>
    );
};
