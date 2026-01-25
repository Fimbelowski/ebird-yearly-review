import * as fs from "fs";

import getLikelySpeciesOnlySeenOnce from "../src/getLikelySpeciesOnlySeenOnce.ts";

const likelySpeciesOnlySeenOnce = getLikelySpeciesOnlySeenOnce();

fs.writeFileSync(
  "./output/likelySpeciesOnlySeenOnce.txt",
  likelySpeciesOnlySeenOnce.join("\n"),
);
