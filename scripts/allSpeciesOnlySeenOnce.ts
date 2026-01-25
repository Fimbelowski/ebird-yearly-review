import * as fs from "fs";

import getSpeciesOnlySeenOnce from "../src/getSpeciesOnlySeenOnce.ts";

const speciesOnlySeenOnce = getSpeciesOnlySeenOnce();

fs.writeFileSync(
  "./output/allSpeciesOnlySeenOnce.txt",
  speciesOnlySeenOnce.join("\n"),
);
