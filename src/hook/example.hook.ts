import { toLower } from "lodash";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { exampleTextsAtom } from "../data/example.data";

/** Returns all indexes of the example texts in which the search string occurs. */
export const useSearchExampleTexts = (searchString: string): number[] => {
    const exampleTexts = useRecoilValue(exampleTextsAtom);

    const indexes = useMemo(() => {
        const indexes: number[] = [];

        const formattedSearchString = toLower(searchString.trim());

        for (let i = 0; i < exampleTexts.length; i++) {
            const formattedText = toLower(exampleTexts[i].trim());

            if (formattedText.indexOf(formattedSearchString) > -1) {
                indexes.push(i);
            }
        }

        return indexes;
    }, [exampleTexts, searchString]);

    return indexes;
};
