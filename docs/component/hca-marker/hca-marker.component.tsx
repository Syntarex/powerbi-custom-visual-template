import { Typography } from "@mui/material";
import { Icon } from "leaflet";
import React, { useCallback, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { hcaDrawerOpenAtom } from "../../data/ui.data";
import { markers } from "../../markers";
import { Hca, LocalHca } from "../../model/hca.model";

const getMarkerIcon = (hca: Hca, isSelected?: boolean) => {
    const markersColors = markers[hca.TYPE];
    let iconUrl = markersColors.blue;

    if (hca.FAVOURITE) {
        iconUrl = markersColors.green;
    }

    if (isSelected) {
        iconUrl = markersColors.pink;
    }

    return new Icon({
        iconUrl,
        iconSize: isSelected ? [26, 40] : hca.FAVOURITE ? [20, 30] : [13, 20],
    });
};

interface HcaMarkerProps {
    hca: LocalHca;
    hidePopup?: boolean /** Hides the popup even if the marker is clicked. */;
    disabled?: boolean;
}

export const HcaMarker = (props: HcaMarkerProps) => {
    const { hca, hidePopup, disabled } = props;
    const { NAME, LATITUDE, LONGITUDE } = hca;

    const [selectedHca, setSelectedHca] = useRecoilState(selectedHcaAtom);
    const setHcaDrawerOpen = useSetRecoilState(hcaDrawerOpenAtom);

    const onMarkerClick = useCallback(() => {
        if (disabled) {
            return;
        }

        setSelectedHca(hca);
        setHcaDrawerOpen(true);
    }, [setSelectedHca, setHcaDrawerOpen, hca, disabled]);
    const onMoreInformationClick = useCallback(() => setHcaDrawerOpen(true), [setHcaDrawerOpen]);

    // Is the account the selected one
    const isSelected = useMemo(() => hca.ID === selectedHca?.ID, [hca, selectedHca]);

    const icon = useMemo(() => getMarkerIcon(hca, isSelected), [hca, isSelected]);

    return (
        <Marker
            position={[LATITUDE, LONGITUDE]}
            icon={icon}
            eventHandlers={{
                click: onMarkerClick,
            }}
            zIndexOffset={isSelected ? 1000 : hca.FAVOURITE ? 500 : undefined}
        >
            {hidePopup ? null : (
                <Popup autoClose closeOnClick>
                    <Typography>{NAME}</Typography>

                    {/* TODO: Add link to connected accounts drawer */}

                    <Typography variant={"subtitle2"} onClick={onMoreInformationClick}>
                        Mehr Informationen
                    </Typography>
                </Popup>
            )}
        </Marker>
    );
};
