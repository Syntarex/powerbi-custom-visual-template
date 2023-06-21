import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { hoveredHcaAtom, selectedHcaAtom } from "../../data/hca.data";
import { connectedHcasSelector } from "../../data/route.data";
import { cursorTooltipAtom } from "../../data/ui.data";
import { Hca } from "../../model/hca.model";
import { Polyline } from "../map/polyline.component";

export const SelectedHcaPolylines = () => {
    const [selectedHca, setSelectedHca] = useRecoilState(selectedHcaAtom);
    const [hoveredHca, setHoveredHca] = useRecoilState(hoveredHcaAtom);

    const [patients, goods] = useRecoilValue(connectedHcasSelector);

    const setCursorTooltip = useSetRecoilState(cursorTooltipAtom);
    const hideCursorTooltip = useResetRecoilState(cursorTooltipAtom);

    const onMouseOver = useCallback((hca: Hca) => setCursorTooltip(`${hca.NAME} | ${hca.CITY}`), [setCursorTooltip]);

    if (!selectedHca || !selectedHca.LATITUDE || !selectedHca.LONGITUDE) {
        return null;
    }

    const { LATITUDE: startLatitude, LONGITUDE: startLongitude } = selectedHca;

    return (
        <>
            <style>{`
                path.leaflet-interactive {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 2s linear forwards;
                    animation-delay: 1s;
                 }

                @keyframes draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>

            {patients.map((hca, index) =>
                !hca.LATITUDE || !hca.LONGITUDE ? null : (
                    <Polyline
                        key={`position-${index}`}
                        highlighted={hca.ID === hoveredHca?.ID}
                        position={[
                            [startLatitude, startLongitude],
                            [hca.LATITUDE, hca.LONGITUDE],
                        ]}
                        onMouseOut={() => {
                            hideCursorTooltip();
                            setHoveredHca(null);
                        }}
                        onMouseOver={() => {
                            onMouseOver(hca);
                            setHoveredHca(hca);
                        }}
                        onClick={() => {
                            hideCursorTooltip();
                            setSelectedHca(hca);
                        }}
                    />
                ),
            )}

            {goods.map((hca, index) =>
                !hca.LATITUDE || !hca.LONGITUDE ? null : (
                    <Polyline
                        key={`position-${index}`}
                        highlighted={hca.ID === hoveredHca?.ID}
                        position={[
                            [startLatitude, startLongitude],
                            [hca.LATITUDE, hca.LONGITUDE],
                        ]}
                        onMouseOut={() => {
                            hideCursorTooltip();
                            setHoveredHca(null);
                        }}
                        onMouseOver={() => {
                            onMouseOver(hca);
                            setHoveredHca(hca);
                        }}
                        onClick={() => {
                            hideCursorTooltip();
                            setSelectedHca(hca);
                        }}
                        color={"limegreen"}
                    />
                ),
            )}
        </>
    );
};
