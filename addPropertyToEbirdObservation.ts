import type EbirdObservation from "./types/EbirdObservation";

export default function addPropertyToEbirdObservation<
  K extends keyof EbirdObservation,
  P extends keyof EbirdObservation
>(
  observation: { [Q in K]: EbirdObservation[Q] },
  key: P,
  value: EbirdObservation[P]
): asserts observation is { [Q in K | P]: EbirdObservation[Q] } {
  Object.assign(observation, { [key]: value });
}
