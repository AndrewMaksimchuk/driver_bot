export const databaseTablesNames = {
  traffic_rules: "traffic_rules", // All rules in simple form
  tests_pdr: "tests_pdr",
  medicine: "medicine",
  road_signs: "road_signs",
  road_marking: "road_marking",
  //   inscriptions_and_symbols: "inscriptions_and_symbols", // Empty table, no data
} as const;

export const databaseTablesNamesInUkraine = {
  traffic_rules: "Дорожні правила",
  tests_pdr: "Тести ПДР",
  medicine: "Медицина",
  road_signs: "Дорожні знаки",
  road_marking: "Дорожня розмітка",
  // inscriptions_and_symbols: "",
} as const;
