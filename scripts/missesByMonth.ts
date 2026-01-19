import * as fs from "fs";

import getTargetSpeciesByMonth from "../src/getTargetSpeciesByMonth.ts";

const missesByMonth = getTargetSpeciesByMonth();

fs.writeFileSync("./output/missesByMonth.csv", missesByMonth);
