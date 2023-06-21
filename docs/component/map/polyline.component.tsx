import { LatLngExpression } from "leaflet";
import React from "react";
import { Polyline as LeafletPolyline } from "react-leaflet";

interface PolylineProps {
    position: LatLngExpression[];
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    onClick?: () => void;
    color?: string;
    highlighted?: boolean;
}

/** Draws a line on a map. */
export const Polyline = (props: PolylineProps) => {
    const { position, onMouseOut, onMouseOver, onClick, color = "purple", highlighted = false } = props;

    return (
        <LeafletPolyline
            pathOptions={{
                weight: highlighted ? 12 : 6,
                color: highlighted ? "red" : color,
            }}
            positions={position}
            eventHandlers={{
                mouseover: onMouseOver,
                mouseout: onMouseOut,
                mousedown: onClick,
            }}
        />
    );
};
