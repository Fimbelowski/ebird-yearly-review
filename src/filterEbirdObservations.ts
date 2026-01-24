import type EbirdObservation from "./types/EbirdObservation.ts";

export default function filterEbirdObservations(
  observations: EbirdObservation[],
  targetYear: number,
  targetStateOrProvince: string,
  targetCounty?: string,
) {
  let filteredObservations = observations.filter(
    ({ date, stateOrProvince }) =>
      date.startsWith(`${targetYear}`) &&
      stateOrProvince === targetStateOrProvince,
  );

  if (targetCounty !== undefined) {
    filteredObservations = filteredObservations.filter(
      ({ county }) => county === targetCounty,
    );
  }

  return filteredObservations;
}
