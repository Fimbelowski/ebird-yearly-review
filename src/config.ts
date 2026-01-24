import type Config from "./types/Config.ts";

const config: Config = {
  barchartsPath: "./inputs/ebird_US-NY-029__1900_2026_1_12_barchart.txt",
  missThreshold: 0.05,
  observationsPath: "./inputs/MyEBirdData.csv",
  // Some species common names appear differently in observations compared to bar charts. This map exists to address those inconsistencies.
  // If you notice an inconsistency you can correct it by adding the name as it appears in observations and then the name as it appears on bar charts.
  // e.g. new Map([
  //  ['Rock Pigeon (Feral Pigeon)', 'Rock Pigeon']
  // ])
  speciesCommonNameCorrectionMap: new Map([
    ["Rock Pigeon (Feral Pigeon)", "Rock Pigeon"],
  ]),
  targetCounty: "Erie",
  targetStateOrProvince: "US-NY",
  targetYear: 2025,
};

export default config;
