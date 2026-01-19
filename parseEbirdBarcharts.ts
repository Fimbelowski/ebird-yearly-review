import * as fs from "fs";

const WEEK_TO_MONTH_RATIO = 4;

export default function parseEbirdBarcharts(
  path: string,
  monthlyFrequencies = false
) {
  const fileData = fs.readFileSync(path, { encoding: "utf-8" });

  const rows = fileData.trim().split("\n").slice(6);

  const speciesNameToObservationFrequency = new Map<string, number[]>();

  rows.forEach((row) => {
    const [speciesName, ...frequencies] = row.trim().split("\t");
    const frequenciesAsNumbers = frequencies.map((frequency) =>
      parseFloat(frequency)
    );

    speciesNameToObservationFrequency.set(speciesName, frequenciesAsNumbers);

    if (monthlyFrequencies) {
      const averagedFrequencies: number[] = [];

      for (let i = 0; i < 12; i++) {
        const left = i * WEEK_TO_MONTH_RATIO;
        const right = left + WEEK_TO_MONTH_RATIO;

        const averageFrequency =
          frequenciesAsNumbers
            .slice(left, right)
            .reduce(
              (accumulator, currentFrequency) => accumulator + currentFrequency,
              0
            ) / WEEK_TO_MONTH_RATIO;

        averagedFrequencies.push(averageFrequency);
      }

      speciesNameToObservationFrequency.set(speciesName, averagedFrequencies);
    }
  });

  return speciesNameToObservationFrequency;
}
