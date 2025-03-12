export interface CountryHistoricalData {
    country: string;
    province: string[];
    timeline: {
        cases: TimelineRecord;
        deaths: TimelineRecord;
        recovered: TimelineRecord;
    };
}

type TimelineRecord = { [date: string]: number };