import addPropertyToEbirdObservation from "./addPropertyToEbirdObservation.ts";
import type EbirdObservation from "./types/EbirdObservation.ts";

function getNextValueOrThrow(values: string[]) {
  const nextValue = values.shift();

  if (nextValue === undefined) {
    throw Error("Not enough values!");
  }

  return nextValue;
}

export default function buildEbirdObservationFromCommaSeparatedValues(
  commaSeparatedValues: string,
): EbirdObservation {
  const observation = {};

  const values = commaSeparatedValues.split(",");

  function curriedGetNextValueOrThrow() {
    return getNextValueOrThrow(values);
  }

  addPropertyToEbirdObservation(
    observation,
    "submissionId",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "commonName",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "scientificName",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "taxonomicOrder",
    parseInt(curriedGetNextValueOrThrow(), 10),
  );

  const count = curriedGetNextValueOrThrow();

  addPropertyToEbirdObservation(
    observation,
    "count",
    count === "X" ? count : parseInt(count, 10),
  );

  addPropertyToEbirdObservation(
    observation,
    "stateOrProvince",
    curriedGetNextValueOrThrow(),
  );

  const county = curriedGetNextValueOrThrow();

  if (county !== "") {
    addPropertyToEbirdObservation(observation, "county", county);
  }

  addPropertyToEbirdObservation(
    observation,
    "locationId",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "location",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "latitude",
    parseFloat(curriedGetNextValueOrThrow()),
  );

  addPropertyToEbirdObservation(
    observation,
    "longitude",
    parseFloat(curriedGetNextValueOrThrow()),
  );

  addPropertyToEbirdObservation(
    observation,
    "date",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "time",
    curriedGetNextValueOrThrow(),
  );

  addPropertyToEbirdObservation(
    observation,
    "protocol",
    curriedGetNextValueOrThrow(),
  );

  const durationMinutes = curriedGetNextValueOrThrow();

  if (durationMinutes !== "") {
    addPropertyToEbirdObservation(
      observation,
      "durationMinutes",
      parseInt(durationMinutes, 10),
    );
  }

  const allObservationsReported = curriedGetNextValueOrThrow();

  addPropertyToEbirdObservation(
    observation,
    "allObservationsReported",
    allObservationsReported === "1",
  );

  const distanceTraveledKilometers = curriedGetNextValueOrThrow();

  if (distanceTraveledKilometers !== "") {
    addPropertyToEbirdObservation(
      observation,
      "distanceTraveledKilometers",
      parseFloat(distanceTraveledKilometers),
    );
  }

  const areaCoveredHectares = curriedGetNextValueOrThrow();

  if (areaCoveredHectares !== "") {
    addPropertyToEbirdObservation(
      observation,
      "areaCoveredHectares",
      parseFloat(areaCoveredHectares),
    );
  }

  addPropertyToEbirdObservation(
    observation,
    "numObservers",
    parseInt(curriedGetNextValueOrThrow(), 10),
  );

  // All properties from here onward are optional, so there may not be any values remaining. If any value is undefined, we simply return early.

  const breedingCode = values.shift();

  if (breedingCode === undefined) {
    return observation;
  }

  if (breedingCode !== "") {
    addPropertyToEbirdObservation(observation, "breedingCode", breedingCode);
  }

  const details = values.shift();

  if (details === undefined) {
    return observation;
  }

  if (details !== "") {
    addPropertyToEbirdObservation(observation, "details", details);
  }

  const checklistComments = values.shift();

  if (checklistComments === undefined) {
    return observation;
  }

  if (checklistComments !== "") {
    addPropertyToEbirdObservation(
      observation,
      "checklistComments",
      checklistComments,
    );
  }

  const mlCatalogNumbers = values.shift();

  if (mlCatalogNumbers === undefined) {
    return observation;
  }

  if (mlCatalogNumbers !== "") {
    addPropertyToEbirdObservation(
      observation,
      "mlCatalogNumbers",
      mlCatalogNumbers.split(" "),
    );
  }

  return observation;
}
