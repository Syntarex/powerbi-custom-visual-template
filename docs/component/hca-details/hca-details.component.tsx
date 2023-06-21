import { Stack, SxProps, Typography } from "@mui/material";
import { isEmpty, isNull, isUndefined } from "lodash";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedHcaAtom } from "../../data/hca.data";
import { routes } from "../../hook/route-to-url.hook";
import { hcaLocals, potentialLocals } from "../../loc/account.loc";
import { HcaListItem } from "../hca-list/hca-list-item.component";
import { Headline } from "../headline/headline.component";

const HcaDetailsRow = (props: { label: string; value?: string | number | boolean | null; oracleBoolean?: boolean }) => {
    const { label, value, oracleBoolean = false } = props;

    return (
        <Stack direction={"row"} gap={4} alignItems={"center"}>
            <Typography sx={{ width: "100%", flexGrow: 7 }}>{label}</Typography>
            <Typography sx={{ width: "100%", flexGrow: 3 }}>
                {isUndefined(value) || isNull(value) ? "-" : !oracleBoolean ? value : value ? "Ja" : "Nein"}
            </Typography>
        </Stack>
    );
};

interface HcaDetailsProps {
    sx?: SxProps;
}

export const HcaDetails = (props: HcaDetailsProps) => {
    const { sx } = props;

    const selectedHca = useRecoilValue(selectedHcaAtom);

    if (!selectedHca) {
        return null;
    }

    const editUrl = routes.editHca(selectedHca.ID);

    return (
        <Stack sx={sx} gap={4}>
            <HcaListItem hca={selectedHca} />

            <Stack gap={1}>
                <Headline editUrl={editUrl}>Finanzierung der Therapie</Headline>

                {!selectedHca.FUNDING || isEmpty(selectedHca.FUNDING) ? (
                    <Typography>
                        Es gibt keine Finanzierungen. Klicke auf Bearbeiten um Finanzierungen hinzuzufügen.
                    </Typography>
                ) : (
                    <>
                        {selectedHca.FUNDING?.map((funding, index) => (
                            <HcaDetailsRow
                                oracleBoolean
                                key={`funding-${index}`}
                                label={`${funding.YEAR} ${funding.THERAPYYTITLE}`}
                                value={funding.FUNDING}
                            />
                        ))}
                    </>
                )}
            </Stack>

            <Stack gap={1}>
                <Headline>Fallzahlen aus Qualitätsberichten</Headline>

                {!selectedHca.POTENTIAL ? (
                    <Typography>Es sind keine Fallzahlen aus Qualitätsberichten verfügbar.</Typography>
                ) : (
                    <>
                        <Typography variant={"h6"}>HCC</Typography>
                        <HcaDetailsRow label={potentialLocals.C22_X} value={selectedHca.POTENTIAL.C22_X} />

                        <Typography variant={"h6"}>BTC</Typography>
                        <HcaDetailsRow label={potentialLocals.C22_1} value={selectedHca.POTENTIAL.C22_1} />
                        <HcaDetailsRow label={potentialLocals.C23} value={selectedHca.POTENTIAL.C23} />
                        <HcaDetailsRow label={potentialLocals.C24} value={selectedHca.POTENTIAL.C24} />
                    </>
                )}
            </Stack>

            <Stack gap={1}>
                <Headline editUrl={editUrl}>Erfragte Anzahl Patient:innen</Headline>

                <Typography variant={"h6"}>{hcaLocals.IMF_TOP}</Typography>
                <HcaDetailsRow
                    label={hcaLocals.PATIENTSUNDERTHERAPY}
                    value={selectedHca.HCA_PWAPP?.PATIENTSUNDERTHERAPY_IMF_TOP_BTC}
                />
                <HcaDetailsRow
                    label={hcaLocals.REQUESTEDPOTENTIAL}
                    value={selectedHca.HCA_PWAPP?.REQUESTEDPOTENTIAL_IMF_TOP_BTC}
                />

                <Typography variant={"h6"}>{hcaLocals.IMF_STR_HIM}</Typography>
                <HcaDetailsRow
                    label={hcaLocals.PATIENTSUNDERTHERAPY}
                    value={selectedHca.HCA_PWAPP?.PATIENTSUNDERTHERAPY_IMF_STR_HIM_HCC}
                />
                <HcaDetailsRow
                    label={hcaLocals.REQUESTEDPOTENTIAL}
                    value={selectedHca.HCA_PWAPP?.REQUESTEDPOTENTIAL_IMF_STR_HIM_HCC}
                />

                <Typography variant={"h6"}>{hcaLocals.IMF_MON_HIM}</Typography>
                <HcaDetailsRow
                    label={hcaLocals.PATIENTSUNDERTHERAPY}
                    value={selectedHca.HCA_PWAPP?.PATIENTSUNDERTHERAPY_IMF_MON_HIM_HCC}
                />
                <HcaDetailsRow
                    label={hcaLocals.REQUESTEDPOTENTIAL}
                    value={selectedHca.HCA_PWAPP?.REQUESTEDPOTENTIAL_IMF_MON_HIM_HCC}
                />
            </Stack>

            <Stack gap={1}>
                <Headline editUrl={editUrl}>Medical Insights</Headline>

                <HcaDetailsRow
                    oracleBoolean
                    label={hcaLocals.CERTONCONCERT}
                    value={selectedHca.HCA_PWAPP?.CERTONCONCERT}
                />
                <HcaDetailsRow label={hcaLocals.CERTCCC} value={selectedHca.HCA_PWAPP?.CERTCCC} />

                <HcaDetailsRow
                    label={hcaLocals.ADVANCEDDISEASE_RATE_HCC}
                    value={selectedHca.HCA_PWAPP?.ADVANCEDDISEASE_RATE_HCC}
                />
                <HcaDetailsRow
                    label={hcaLocals.ADVANCEDDISEASE_RATE_BTC}
                    value={selectedHca.HCA_PWAPP?.ADVANCEDDISEASE_RATE_BTC}
                />

                <HcaDetailsRow
                    label={hcaLocals.PATIENTASSIGNMENT_FROM}
                    value={selectedHca.HCA_PWAPP?.PATIENTASSIGNMENT_FROM}
                />

                <HcaDetailsRow label={hcaLocals.SOC_HCC} value={selectedHca.HCA_PWAPP?.SOC_HCC} />
                <HcaDetailsRow
                    label={hcaLocals.ALLPATIENTSGEMCIS_BTC}
                    value={selectedHca.HCA_PWAPP?.ALLPATIENTSGEMCIS_BTC}
                />
            </Stack>

            <Stack gap={1}>
                <Headline editUrl={editUrl}>Ambulante Versorgung</Headline>

                <HcaDetailsRow oracleBoolean label={hcaLocals.PARAGRAPH_116} value={selectedHca.HCA_PWAPP?.P116} />
                <HcaDetailsRow oracleBoolean label={hcaLocals.PARAGRAPH_116A} value={selectedHca.HCA_PWAPP?.P116A} />
                <HcaDetailsRow
                    oracleBoolean
                    label={hcaLocals.PARAGRAPH_116New}
                    value={selectedHca.HCA_PWAPP?.P116NEW}
                />
                <HcaDetailsRow oracleBoolean label={hcaLocals.MVZ} value={selectedHca.MVZ} />
                <HcaDetailsRow
                    oracleBoolean
                    label={hcaLocals.UNIVERSITYAMBULANCE}
                    value={selectedHca.HCA_PWAPP?.UNIVERSITYAMBULANCE}
                />
                <HcaDetailsRow oracleBoolean label={hcaLocals.SURGERY} value={selectedHca.HCA_PWAPP?.SURGERY} />
                <HcaDetailsRow
                    oracleBoolean
                    label={hcaLocals.PARTIALLYPINATIENT}
                    value={selectedHca.HCA_PWAPP?.PARTIALLYINPATIENT}
                />
                <HcaDetailsRow oracleBoolean label={hcaLocals.STATIONARY} value={selectedHca.HCA_PWAPP?.STATIONARY} />
            </Stack>
        </Stack>
    );
};
