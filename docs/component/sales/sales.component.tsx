import { SxProps } from "@mui/material";
import React, { useState } from "react";
import { Hca } from "../../model/hca.model";
import { SalesGraph } from "../sales-graph/sales-graph.component";
import { SalesReportsGraph } from "../sales-reports-graph/sales-reports-graph.component";

interface SalesProps {
    sx?: SxProps;
    hca?: Hca;
    height?: number;
    hideControls?: boolean;
}

export const Sales = (props: SalesProps) => {
    const { sx, hca, height, hideControls } = props;

    const [site, setSite] = useState<"direct-sales" | "reports">("direct-sales");

    switch (site) {
        case "direct-sales":
            return (
                <SalesGraph
                    hca={hca}
                    height={height}
                    hideControls={hideControls}
                    sx={sx}
                    onCalenderClicked={() => setSite("reports")}
                />
            );
        case "reports":
            return (
                <SalesReportsGraph
                    hca={hca}
                    height={height}
                    hideControls={hideControls}
                    sx={sx}
                    onCalenderClicked={() => setSite("direct-sales")}
                />
            );
    }
};
