export interface ITrafficRule {
  id: number;
  header: string;
  text: string;
  updated_day: number | null;
}

export interface ITestPdr {
  id: number;
  qustion: string;
  answer: string | null;
  updated_day: number | null;
  theme: string | null;
  photo_name: string | null;
  item: number | null;
  file_id: string | null;
}

export interface IMedicine {
  id: number;
  header: string;
  text: string;
}

export interface IRoadSign {
  id: number;
  header: string;
  number: string;
  description: string;
  file_id: string | null;
  photo_name: string;
  updated_day: number | null;
}

export interface IRoadMark {
  id: number;
  header: string;
  number: string;
  description: string;
  file_id: string | null;
  photo_name: string;
  updated_day: number | null;
}

export interface TableToRow {
  traffic_rules: ITrafficRule;
  tests_pdr: ITestPdr;
  medicine: IMedicine;
  road_signs: IRoadSign;
  road_marking: IRoadMark;
}
