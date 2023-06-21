import { Box, SxProps } from "@mui/material";
import { LatLngBoundsExpression } from "leaflet";
import { floor, isEmpty } from "lodash";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useRecoilValue } from "recoil";
import { localHcasSelector } from "../../data/hca.data";
import { HcaMarker } from "../hca-marker/hca-marker.component";
import { MapEvents } from "../map-events/map-events.component";
import { SelectedHcaPolylines } from "../selected-hca-polylines/selected-hca-polylines.component";

interface MapProps {
    sx?: SxProps;
    disabled?: boolean;
}

export const Map = (props: MapProps) => {
    const { sx, disabled } = props;

    // Used to determinate the possible height of the element
    const container = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null>(null);

    // Set the container's height to state
    useEffect(() => setHeight(floor(container.current?.clientHeight ?? 0)), [container.current]);

    // All hcas to render on the map
    const hcasOnMap = useRecoilValue(localHcasSelector);

    // Returns the ideal bounds for the map so the user sees all accounts at once
    const bounds: LatLngBoundsExpression = useMemo(() => {
        if (isEmpty(hcasOnMap)) {
            // Return center of Germany as default
            return [[51.164229, 10.454119]];
        }

        return hcasOnMap.map((hca) => [hca.LATITUDE, hca.LONGITUDE]);
    }, [hcasOnMap]);

    return (
        <Box sx={sx} ref={container}>
            {height && (
                <Box
                    sx={{
                        height,
                        "& > .leaflet-container": {
                            height,
                        },
                    }}
                >
                    <MapContainer bounds={bounds}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <MapEvents />

                        <SelectedHcaPolylines />

                        {hcasOnMap.map((hca) => (
                            <HcaMarker disabled={disabled} hidePopup key={`hca-marker-${hca.ID}`} hca={hca} />
                        ))}
                    </MapContainer>
                </Box>
            )}
        </Box>
    );
};
