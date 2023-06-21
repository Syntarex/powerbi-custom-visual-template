import { Box, Tooltip } from "@mui/material";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { useMouse } from "rooks";
import { cursorTooltipAtom } from "../../data/ui.data";

export const CursorTooltip = (): JSX.Element | null => {
    const tooltipText = useRecoilValue(cursorTooltipAtom);

    const { clientX, clientY } = useMouse();

    if (!tooltipText) {
        return null;
    }

    return (
        <Tooltip title={tooltipText} open={true} placement={"top"}>
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 10000,
                    width: 0,
                    height: 0,
                    left: clientX,
                    top: clientY,
                    pointerEvents: "none",
                }}
            />
        </Tooltip>
    );
};
