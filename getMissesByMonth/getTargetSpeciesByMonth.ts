import parseEbirdBarcharts from "../parseEbirdBarcharts.ts";
import parseEbirdData from "../parseEbirdData.ts";
import type EbirdObservation from "../types/EbirdObservation.ts";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Options {
  biggestSpeciesMissOnly?: boolean;
  missThreshold: number;
  // Some species common names appear differently in observations compared to bar charts. This map exists to address those inconsistencies.
  // If you notice an inconsistency you can correct it by adding the name as it appears in observations and then the name as it appears on bar charts.
  // e.g. new Map([
  //  ['Rock Pigeon (Feral Pigeon)', 'Rock Pigeon']
  // ])
  observationsPath?: string;
  outputAsCsv?: boolean;
  speciesCommonNameCorrectionMap?: Map<string, string>;
  targetCounty?: string;
  targetStateOrProvince: string;
  year: number;
}

export default function getTargetSpeciesByMonth(
  barchartsPath: string,
  options: Options,
) {
  const {
    biggestSpeciesMissOnly = false,
    missThreshold,
    observationsPath,
    outputAsCsv = false,
    speciesCommonNameCorrectionMap = new Map(),
    targetCounty,
    targetStateOrProvince,
    year,
  } = options;

  let observations: EbirdObservation[] = [];

  if (observationsPath !== undefined) {
    observations = parseEbirdData(observationsPath).filter(
      ({ date, stateOrProvince }) =>
        date.startsWith(`${year}`) && stateOrProvince === targetStateOrProvince,
    );
  }

  if (targetCounty !== undefined) {
    observations = observations.filter(({ county }) => county === targetCounty);
  }

  const uniqueSpeciesObservedCommonNames = new Set<string>();

  observations.forEach(({ commonName }) => {
    uniqueSpeciesObservedCommonNames.add(
      speciesCommonNameCorrectionMap.get(commonName) ?? commonName,
    );
  });

  const speciesCommonNameToMonthlyFrequencies = parseEbirdBarcharts(
    barchartsPath,
    true,
  );

  const monthlyMisses: Array<Array<[string, number]>> = [];

  for (let i = 0; i < 12; i++) {
    monthlyMisses.push([]);
  }

  speciesCommonNameToMonthlyFrequencies.forEach(
    (monthlyFrequencies, speciesCommonName) => {
      if (!uniqueSpeciesObservedCommonNames.has(speciesCommonName)) {
        const indicesOfMonthsMissed: number[] = [];
        let highestMissedFrequency = -Infinity;

        monthlyFrequencies.forEach((monthlyFrequency, index) => {
          if (monthlyFrequency >= missThreshold) {
            if (
              biggestSpeciesMissOnly &&
              monthlyFrequency > highestMissedFrequency
            ) {
              indicesOfMonthsMissed.splice(
                0,
                indicesOfMonthsMissed.length,
                index,
              );
              highestMissedFrequency = monthlyFrequency;
            } else if (!biggestSpeciesMissOnly) {
              indicesOfMonthsMissed.push(index);
            }
          }
        });

        indicesOfMonthsMissed.forEach((index) => {
          monthlyMisses[index].push([
            speciesCommonName,
            monthlyFrequencies[index],
          ]);
        });
      }
    },
  );

  monthlyMisses.forEach((misses) => {
    misses.sort(([, frequencyA], [, frequencyB]) => frequencyB - frequencyA);
  });

  if (outputAsCsv) {
    const rows: string[] = [];

    const monthsRow: string[] = [];
    for (let i = 0; i < MONTHS.length; i++) {
      monthsRow.push(MONTHS[i], "");
    }

    rows.push(monthsRow.join(","));

    let numAdditionalRows = 0;

    for (let i = 0; i < monthlyMisses.length; i++) {
      numAdditionalRows = Math.max(numAdditionalRows, monthlyMisses[i].length);
    }

    for (let i = 0; i < numAdditionalRows; i++) {
      const columns: Array<number | string> = [];

      for (let j = 0; j < monthlyMisses.length; j++) {
        const targetSpecies = monthlyMisses[j][i];

        if (targetSpecies !== undefined) {
          const [speciesCommonName, frequency] = targetSpecies;
          columns.push(speciesCommonName, frequency);
        } else {
          columns.push("", "");
        }
      }

      rows.push(columns.join(","));
    }

    return rows.join("\n");
  }

  return monthlyMisses;
}
