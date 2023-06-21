import { CircularProgress } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { hcasAtom } from "../../data/hca.data";
import { Hca } from "../../model/hca.model";

interface DataInitializerProps {
    children: ReactNode;
    hcas?: Hca[];
}

/** Sets the passed data into recoil atoms */
export const DataInitializer = (props: DataInitializerProps) => {
    const { children, hcas = [] } = props;

    const [initialized, setInitialized] = useState(false);

    const initHcas = useSetRecoilState(hcasAtom);

    // Initialize data into recoil atoms
    useEffect(() => {
        initHcas(hcas);

        setInitialized(true);
    }, [hcas, initHcas]);

    // Show progress bar while initializing
    if (!initialized) {
        return <CircularProgress />;
    }

    return <>{children}</>;
};
