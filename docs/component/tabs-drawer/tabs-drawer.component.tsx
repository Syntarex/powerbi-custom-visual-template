import { Edit } from "@mui/icons-material";
import Close from "@mui/icons-material/Close";
import { Box, IconButton, Drawer as MuiDrawer, Tab as MuiTab, Stack, SxProps, Tabs, Tooltip } from "@mui/material";
import { isEmpty } from "lodash";
import React, { ReactElement, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useRecoilValue } from "recoil";
import { enableEditIconsAtom } from "../../data/ui.data";
import { useRouteToUrl } from "../../hook/route-to-url.hook";

export interface DrawerTab {
    title: string;
    component: ReactNode;
    editUrl?: string;
    tooltip?: string;
    icon?: ReactElement;
}

const Tab = (props: { tab: DrawerTab; onClick: () => void }) => {
    const { tab, onClick } = props;

    const tabComponent = (
        <MuiTab id={`tab-${tab.title}`} label={tab.title} iconPosition={"start"} icon={tab.icon} onClick={onClick} />
    );

    if (tab.tooltip) {
        return <Tooltip title={tab.tooltip}>{tabComponent}</Tooltip>;
    }

    return <>{tabComponent}</>;
};

const TabPanel = (props: { children: ReactNode; index: number; openTab: number }) => {
    const { children, index, openTab } = props;

    return (
        <div role={"tabpanel"} hidden={index !== openTab}>
            {index === openTab && <>{children}</>}
        </div>
    );
};

interface TabsDrawerProps {
    sx?: SxProps;
    open: boolean;
    onClose: () => void;
    tabs: DrawerTab[];
    width?: number;
    editUrl?: string;
    listenToForTabReset?: any /** If that value changes, the active tab will reset to the first one. */;
}

/** A drawer with close icon and tabs for the user to select. */
export const TabsDrawer = (props: TabsDrawerProps) => {
    const { sx, open, onClose, tabs, width = 500, editUrl, listenToForTabReset } = props;

    const [openTab, setOpenTab] = useState(0);

    useEffect(() => setOpenTab(0), [listenToForTabReset]);

    const enableEditIcon = useRecoilValue(enableEditIconsAtom);
    const routeToEditUrl = useRouteToUrl(editUrl);

    const onTabChange = useCallback((event: SyntheticEvent, newOpenTab: number) => setOpenTab(newOpenTab), []);

    const onViewSwipe = useCallback((newOpenTab: number) => setOpenTab(newOpenTab), []);

    if (isEmpty(tabs)) {
        return null;
    }

    return (
        <MuiDrawer open={open} onClose={onClose} anchor={"right"}>
            <Stack sx={{ width, ...sx }} padding={2} paddingTop={0} gap={2}>
                <Stack
                    gap={2}
                    marginBottom={2}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Box sx={{ maxWidth: `calc(100% - ${editUrl ? "80" : "40"}px)`, flexGrow: 1 }}>
                        <Tabs allowScrollButtonsMobile variant={"scrollable"} value={openTab} onChange={onTabChange}>
                            {tabs.map((tab, index) => (
                                <Tab key={`tab-${index}`} tab={tab} onClick={() => setOpenTab(index)} />
                            ))}
                        </Tabs>
                    </Box>

                    {!editUrl || !enableEditIcon ? null : (
                        <Tooltip title={"Bearbeiten"}>
                            <IconButton sx={{ ml: 1 }} onClick={routeToEditUrl}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title={"Schließen"}>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <SwipeableViews index={openTab} onChangeIndex={onViewSwipe}>
                    {tabs.map((tab, index) => (
                        <TabPanel key={`tab-content-${index}`} openTab={openTab} index={index}>
                            <>{tab.component}</>
                        </TabPanel>
                    ))}
                </SwipeableViews>
            </Stack>
        </MuiDrawer>
    );
};
