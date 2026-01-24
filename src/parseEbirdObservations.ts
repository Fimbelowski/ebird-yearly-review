import * as fs from "fs";

import buildEbirdObservationFromCommaSeparatedValues from "./buildEbirdObservationFromCommaSeparatedValues.ts";

export default function parseEbirdObservations(path: string) {
  const fileData = fs.readFileSync(path, { encoding: "utf-8" });

  const rows = fileData.split("\n").slice(1, -1);

  return rows.map((row) => buildEbirdObservationFromCommaSeparatedValues(row));
}
