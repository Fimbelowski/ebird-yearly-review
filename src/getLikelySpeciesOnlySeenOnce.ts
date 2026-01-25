import config from "../config.ts";
import getSpeciesOnlySeenOnce from "./getSpeciesOnlySeenOnce.ts";
import parseEbirdBarcharts from "./parseEbirdBarcharts.ts";

export default function getLikelySpeciesOnlySeenOnce() {
  const { barchartsPath, missThreshold } = config;

  const barcharts = parseEbirdBarcharts(barchartsPath, true);

  return getSpeciesOnlySeenOnce().filter((commonName) => {
    const monthlyFrequencies = barcharts.get(commonName) ?? [];

    return monthlyFrequencies.some((frequency) => frequency >= missThreshold);
  });
}
