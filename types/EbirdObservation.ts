export default interface EbirdObservation {
  allObservationsReported: boolean;
  areaCoveredHectares?: number;
  breedingCode?: string;
  checklistComments?: string;
  commonName: string;
  count: number | "X";
  county?: string;
  date: string;
  details?: string;
  distanceTraveledKilometers?: number;
  durationMinutes?: number;
  latitude: number;
  location: string;
  locationId: string;
  longitude: number;
  mlCatalogNumbers?: string[];
  numObservers: number;
  protocol: string;
  scientificName: string;
  stateOrProvince: string;
  submissionId: string;
  taxonomicOrder: number;
  time: string;
}
