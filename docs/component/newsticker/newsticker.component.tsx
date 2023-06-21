import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Stack, Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
import { useRecoilValue } from "recoil";
import { activeNewsSelector } from "../../data/news.data";

export const Newsticker = () => {
    const news = useRecoilValue(activeNewsSelector);

    return (
        <Stack direction={"row"} spacing={2}>
            <FeedOutlinedIcon />
            <Marquee direction={"right"} pauseOnHover={true} delay={2} gradientWidth={100}>
                <Stack direction={"row"} spacing={2}>
                    {news.map((each, index) => {
                        return (
                            <>
                                {index > 0 && <Typography>|</Typography>}
                                <Typography key={each.NWT_ID} variant={"button"}>
                                    {each.NWT_MESSAGE_TEXT}
                                </Typography>
                            </>
                        );
                    })}
                    <Typography variant={"button"}></Typography> {/*Empty message for spacing*/}
                </Stack>
            </Marquee>
        </Stack>
    );
};
