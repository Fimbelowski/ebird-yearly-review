import getTargetSpeciesByMonth from "./getTargetSpeciesByMonth.ts";

// const missesByMonth = getTargetSpeciesByMonth(
//   "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
// );

// console.log(missesByMonth);

// const missesByMonthLargest = getTargetSpeciesByMonth(
//   "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
// );

// console.log(missesByMonthLargest);

const yearlyTargetSpeciesRoadmap = getTargetSpeciesByMonth(
  "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
  true,
);

console.log(yearlyTargetSpeciesRoadmap);
