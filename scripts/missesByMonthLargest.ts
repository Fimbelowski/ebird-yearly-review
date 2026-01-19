import * as fs from "fs";

import getTargetSpeciesByMonth from "../src/getTargetSpeciesByMonth.ts";

const missesByMonthLargest = getTargetSpeciesByMonth({
  biggestSpeciesMissOnly: true,
});

fs.writeFileSync("./output/missesByMonthLargest.csv", missesByMonthLargest);
