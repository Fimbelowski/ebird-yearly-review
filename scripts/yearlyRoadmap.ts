import getTargetSpeciesByMonth from "../src/getTargetSpeciesByMonth.ts";

const yearlyTargetSpeciesRoadmap = getTargetSpeciesByMonth({
  biggestSpeciesMissOnly: true,
  yearlyRoadmap: true,
});

console.log(yearlyTargetSpeciesRoadmap);
