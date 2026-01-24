import config from "./config.ts";
import type EbirdObservation from "./types/EbirdObservation.ts";
import filterEbirdObservations from "./filterEbirdObservations.ts";
import parseEbirdBarcharts from "./parseEbirdBarcharts.ts";
import parseEbirdObservations from "./parseEbirdObservations.ts";

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
  yearlyRoadmap?: boolean;
}

export default function getTargetSpeciesByMonth(options: Options = {}) {
  const {
    barchartsPath,
    missThreshold,
    observationsPath,
    speciesCommonNameCorrectionMap = new Map(),
    targetCounty,
    targetStateOrProvince,
    targetYear,
  } = config;

  const { biggestSpeciesMissOnly = false, yearlyRoadmap = false } = options;

  let observations: EbirdObservation[] = [];

  if (!yearlyRoadmap) {
    observations = parseEbirdObservations(observationsPath);
  }

  observations = filterEbirdObservations(
    observations,
    targetYear,
    targetStateOrProvince,
    targetCounty,
  );

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
