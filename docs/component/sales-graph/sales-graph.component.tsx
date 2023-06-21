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
    Switch,
    SxProps,
    Typography,
    useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { floor, sortBy, uniq } from "lodash";
import React, { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import { allSalesSelector } from "../../data/hca.data";
import { Hca, Sale } from "../../model/hca.model";
import { groupSales } from "../../util/group-sales.util";
import { formatNumberWithThousandsSeparator } from "../../util/thousand-seperators.util";

interface SalesGraphProps {
    sx?: SxProps;
    hca?: Hca;
    height?: number;
    hideControls?: boolean;
    onCalenderClicked?: () => void;
}

export const SalesGraph = (props: SalesGraphProps) => {
    const { sx, height = 600, hca, hideControls = false, onCalenderClicked } = props;

    const allSales = useRecoilValue(allSalesSelector);

    const theme = useTheme();

    const sales = useMemo(() => {
        let sales: Sale[] = allSales;

        // If there is a specific hca, use the sales of it
        if (hca) {
            if (!hca.SALES) {
                return [];
            }

            sales = hca.SALES;
        }

        // Filter out sales that are older then 12 months
        const filterDate = dayjs().subtract(13, "month");
        sales = sales.filter((each) => dayjs(`${each.MONTH} ${each.YEAR}`, "M YYYY").isAfter(filterDate));

        return sales;
    }, [allSales, hca]);

    const products = useMemo(() => uniq(sales.map((each) => each.PRODUCT)), [sales]);
    const [selectedProduct, setSelectedProduct] = useState(products.length === 1 ? products[0] : "");

    const landscapes = useMemo(() => uniq(sales.map((each) => each.LANDSCAPE)).sort(), [sales]);
    const [selectedLandscape, setSelectedLandscape] = useState(landscapes.length === 1 ? landscapes[0] : "");

    const groupedSales = useMemo(() => {
        let filteredSales = !selectedProduct ? sales : sales.filter((each) => each.PRODUCT === selectedProduct);
        filteredSales = !selectedLandscape
            ? filteredSales
            : filteredSales.filter((each) => each.LANDSCAPE === selectedLandscape);

        return groupSales(filteredSales);
    }, [sales, selectedProduct, selectedLandscape]);

    const graphData = useMemo(() => {
        const mapped = groupedSales.map((each) => ({
            date: dayjs(`${each.MONTH} ${each.YEAR}`, "M YYYY").format("MM.YYYY"),
            euro: floor(each.EURO, 0),
            mg: each.PACKAGES,
        }));

        return sortBy(mapped, (each) => dayjs(each.date, "MM.YYYY").toISOString());
    }, [groupedSales, selectedProduct]);

    const [dataKey, setDataKey] = useState<"mg" | "euro">("mg");

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
                            <MuiTooltip title={"Zeige Jahresansicht"}>
                                <IconButton onClick={onCalenderClicked}>
                                    <CalendarMonth />
                                </IconButton>
                            </MuiTooltip>
                        </Box>
                    )}

                    <Switch
                        checked={dataKey === "euro"}
                        onChange={(ev, checked) => setDataKey(checked ? "euro" : "mg")}
                    />
                    <Typography>In Euro anzeigen</Typography>

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
                        dataKey={dataKey}
                        width={90}
                        tickFormatter={(value) => formatNumberWithThousandsSeparator(value as number)}
                    />

                    <Tooltip formatter={(value) => formatNumberWithThousandsSeparator(value as number)} />
                    <Legend />

                    <Bar
                        dataKey={dataKey}
                        fill={dataKey === "mg" ? theme.palette.primary.main : theme.palette.secondary.main}
                        maxBarSize={100}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Stack>
    );
};
