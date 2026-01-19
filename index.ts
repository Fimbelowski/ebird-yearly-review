import getTargetSpeciesByMonth from "./src/getTargetSpeciesByMonth.ts";

// const missesByMonth = getTargetSpeciesByMonth();

// console.log(missesByMonth);

// const missesByMonthLargest = getTargetSpeciesByMonth({
//   biggestSpeciesMissOnly: true,
// });

// console.log(missesByMonthLargest);

const yearlyTargetSpeciesRoadmap = getTargetSpeciesByMonth({
  biggestSpeciesMissOnly: true,
  yearlyRoadmap: true,
});

console.log(yearlyTargetSpeciesRoadmap);
