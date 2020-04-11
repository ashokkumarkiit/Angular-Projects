/* Class Used to hold the Country wise total values */
export interface TimeSeriesDR {
    category: String;
    report_date: String;
    total: Number;
}

export class TimeSeriesDRCombined {
    report_date: String;
    totalDeaths: Number;
    totalRecovered: Number;
}

export interface TimeSeriesDRContainer {
    deaths: TimeSeriesDR[],
    recovered: TimeSeriesDR[]
}

export interface TimeSeriesDRResponse {
    success: Boolean;
    timeseries_data: TimeSeriesDRContainer;
}
