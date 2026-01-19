import getTargetSpeciesByMonth from "./getMissesByMonth/getTargetSpeciesByMonth.ts";

// const missesByMonth = getTargetSpeciesByMonth(
//   "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
//   {
//     missThreshold: 0.05,
//     observationsPath: "./inputs/MyEBirdData.csv",
//     speciesCommonNameCorrectionMap: new Map([
//       ["Rock Pigeon (Feral Pigeon)", "Rock Pigeon"],
//     ]),
//     targetCounty: "Erie",
//     targetStateOrProvince: "US-NY",
//     year: 2025,
//   },
// );

// console.log(missesByMonth);

// const missesByMonthLargest = getTargetSpeciesByMonth(
//   "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
//   {
//     biggestSpeciesMissOnly: true,
//     missThreshold: 0.05,
//     observationsPath: "./inputs/MyEBirdData.csv",
//     speciesCommonNameCorrectionMap: new Map([
//       ["Rock Pigeon (Feral Pigeon)", "Rock Pigeon"],
//     ]),
//     targetCounty: "Erie",
//     targetStateOrProvince: "US-NY",
//     year: 2025,
//   },
// );

// console.log(missesByMonthLargest);

const yearlyTargetSpeciesRoadmap = getTargetSpeciesByMonth(
  "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
  {
    biggestSpeciesMissOnly: true,
    missThreshold: 0.05,
    outputAsCsv: true,
    speciesCommonNameCorrectionMap: new Map([
      ["Rock Pigeon (Feral Pigeon)", "Rock Pigeon"],
    ]),
    targetCounty: "Erie",
    targetStateOrProvince: "US-NY",
    year: 2025,
  },
);

console.log(yearlyTargetSpeciesRoadmap);
