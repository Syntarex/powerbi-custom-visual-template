import CalendarMonth from "@mui/icons-material/CalendarMonth";
import {
    Box,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Tooltip as MuiTooltip,
    Select,
    Stack,
    SxProps,
    useTheme,
} from "@mui/material";
import { floor, sortBy, uniq } from "lodash";
import React, { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { hcasAtom } from "../../data/hca.data";
import { Hca, SalesReport } from "../../model/hca.model";
import { groupSalesReports } from "../../util/group-sales.util";
import { formatNumberWithThousandsSeparator } from "../../util/thousand-seperators.util";

interface SalesReportsGraphProps {
    sx?: SxProps;
    hca?: Hca;
    height?: number;
    hideControls?: boolean;
    onCalenderClicked?: () => void;
}

export const SalesReportsGraph = (props: SalesReportsGraphProps) => {
    const { sx, height = 600, hca, hideControls = false, onCalenderClicked } = props;

    const allHcas = useRecoilValue(hcasAtom);

    const theme = useTheme();

    const salesReports = useMemo(() => {
        let reports: SalesReport[] = [];

        // If there is a specific hca, use these sales reports of it
        if (hca) {
            if (!hca.SALES_REPORTS) {
                return [];
            }

            reports = hca.SALES_REPORTS;
        } else {
            // Collect all sales of all hcas
            for (const hca of allHcas) {
                if (hca.SALES_REPORTS) {
                    reports.push(...hca.SALES_REPORTS);
                }
            }
        }

        return reports;
    }, [allHcas, hca]);

    const products = useMemo(() => uniq(salesReports.map((each) => each.PRODUCT)), [salesReports]);
    const [selectedProduct, setSelectedProduct] = useState(products.length === 1 ? products[0] : "");

    const landscapes = useMemo(() => uniq(salesReports.map((each) => each.LANDSCAPE)).sort(), [salesReports]);
    const [selectedLandscape, setSelectedLandscape] = useState(landscapes.length === 1 ? landscapes[0] : "");

    const groupedSalesReports = useMemo(() => {
        let filteredReports = !selectedProduct
            ? salesReports
            : salesReports.filter((each) => each.PRODUCT === selectedProduct);

        filteredReports = !selectedLandscape
            ? filteredReports
            : filteredReports.filter((each) => each.LANDSCAPE === selectedLandscape);

        return groupSalesReports(filteredReports);
    }, [salesReports, selectedProduct, selectedLandscape]);

    const graphData = useMemo(() => {
        const mapped = groupedSalesReports.map((each) => ({
            date: each.YEAR,
            euro: floor(each.EURO, 0),
        }));

        return sortBy(mapped, (each) => each.date);
    }, [groupedSalesReports, selectedProduct]);

    return (
        <Stack sx={{ height, ...sx }}>
            {hideControls ? null : (
                <Stack
                    sx={{ height: 72 }}
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                >
                    {!onCalenderClicked ? null : (
                        <Box sx={{ width: "100%", flexGrow: 1 }}>
                            <MuiTooltip title={"Zeige letzte 12 Monate"}>
                                <IconButton onClick={onCalenderClicked}>
                                    <CalendarMonth />
                                </IconButton>
                            </MuiTooltip>
                        </Box>
                    )}

                    <FormControl variant={"outlined"} sx={{ minWidth: 200 }}>
                        <InputLabel id="landscape-label">Alle Landscapes</InputLabel>
                        <Select
                            value={selectedLandscape}
                            labelId={"landscape-label"}
                            onChange={(ev) => setSelectedLandscape(ev.target.value as string)}
                        >
                            {landscapes.length <= 1 ? null : (
                                <MenuItem value={""}>
                                    <em>Alle</em>
                                </MenuItem>
                            )}

                            {landscapes.map((landscape) => (
                                <MenuItem key={`item-${landscape}`} value={landscape}>
                                    {landscape}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant={"outlined"} sx={{ minWidth: 200 }}>
                        <InputLabel id="product-label">Alle Produkte</InputLabel>
                        <Select
                            value={selectedProduct}
                            labelId={"product-label"}
                            onChange={(ev) => setSelectedProduct(ev.target.value as string)}
                        >
                            {products.length <= 1 ? null : (
                                <MenuItem value={""}>
                                    <em>Alle</em>
                                </MenuItem>
                            )}

                            {products.map((product) => (
                                <MenuItem key={`item-${product}`} value={product}>
                                    {product}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            )}

            <ResponsiveContainer width={"100%"} height={hideControls ? height : height - 72}>
                <BarChart data={graphData}>
                    <CartesianGrid />

                    <XAxis dataKey={"date"} />
                    <YAxis
                        dataKey={"euro"}
                        width={90}
                        tickFormatter={(value) => formatNumberWithThousandsSeparator(value as number)}
                    />

                    <Tooltip formatter={(value) => formatNumberWithThousandsSeparator(value as number)} />
                    <Legend />

                    <Bar dataKey={"euro"} fill={theme.palette.primary.main} maxBarSize={100} />
                </BarChart>
            </ResponsiveContainer>
        </Stack>
    );
};
