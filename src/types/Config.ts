export default interface Config {
  barchartsPath: string;
  missThreshold: number;
  observationsPath: string;
  speciesCommonNameCorrectionMap: Map<string, string>;
  targetCounty?: string;
  targetStateOrProvince: string;
  targetYear: number;
}
