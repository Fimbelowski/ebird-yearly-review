import getTargetSpeciesByMonth from "../src/getTargetSpeciesByMonth.ts";

const missesByMonthLargest = getTargetSpeciesByMonth({
  biggestSpeciesMissOnly: true,
});

console.log(missesByMonthLargest);
