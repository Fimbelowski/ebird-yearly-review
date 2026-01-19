import * as fs from "fs";

import getTargetSpeciesByMonth from "../src/getTargetSpeciesByMonth.ts";

const yearlyRoadmap = getTargetSpeciesByMonth({
  biggestSpeciesMissOnly: true,
  yearlyRoadmap: true,
});

fs.writeFileSync("./output/yearlyRoadmap.csv", yearlyRoadmap);
