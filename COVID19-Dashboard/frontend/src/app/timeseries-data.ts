/* Class Used to hold the Country wise total values */
export interface TimeSeries {
    category: String;
    report_date: String;
    total: Number;
}

export interface TimeSeriesResponse {
    success: Boolean;
    timeseries_data: TimeSeries[];
}
