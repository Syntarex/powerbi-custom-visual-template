import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useRecoilValue } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { useResetMapBounds } from "../../hook/reset-map-bounds.hook";

/** Listens to certain events and leverages the map api. */
export const MapEvents = () => {
    const map = useMap();

    const selectedHca = useRecoilValue(selectedHcaAtom);

    const resetMapBounds = useResetMapBounds();

    // Set center of map to selected hca
    useEffect(() => {
        // Reset map bounds if no hca is selected
        if (!selectedHca) {
            resetMapBounds();
            return;
        }

        const { LATITUDE, LONGITUDE } = selectedHca;

        // Hca doesn't provide a valid location
        if (!LATITUDE || !LONGITUDE) {
            return;
        }

        // Close the popup so the move can move
        map.closePopup();

        // Move center of map to hca's location
        map.fitBounds([[LATITUDE, LONGITUDE]], {
            maxZoom: 10,
        });
    }, [selectedHca, map, resetMapBounds]);

    return null;
};
