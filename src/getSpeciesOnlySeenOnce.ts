import config from "../config.ts";
import filterEbirdObservations from "./filterEbirdObservations.ts";
import parseEbirdObservations from "./parseEbirdObservations.ts";

export default function getSpeciesOnlySeenOnce() {
  const { observationsPath, targetCounty, targetStateOrProvince, targetYear } =
    config;

  let observations = parseEbirdObservations(observationsPath);

  observations = filterEbirdObservations(
    observations,
    targetYear,
    targetStateOrProvince,
    targetCounty,
  );

  observations = observations.filter(
    ({ commonName }) =>
      !commonName.includes("sp") &&
      !commonName.includes("/") &&
      !commonName.includes("(Domestic type)"),
  );

  const speciesCommonNameToNumObservations = new Map<string, number>();

  observations.forEach(({ commonName }) => {
    let maybeSuperspeciesCommonName = commonName;

    // Observation is a subspecies, and needs to be lumped in with the superspecies
    if (maybeSuperspeciesCommonName.includes("(")) {
      maybeSuperspeciesCommonName = maybeSuperspeciesCommonName.replace(
        /\s\(.*\)/,
        "",
      );
    }

    const numObservations =
      speciesCommonNameToNumObservations.get(maybeSuperspeciesCommonName) ?? 0;

    speciesCommonNameToNumObservations.set(
      maybeSuperspeciesCommonName,
      numObservations + 1,
    );
  });

  return Array.from(speciesCommonNameToNumObservations.entries())
    .filter(([, numObservations]) => numObservations === 1)
    .map(([commonName]) => commonName)
    .sort();
}
