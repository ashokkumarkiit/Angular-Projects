/* Class Used to hold the Exercise */
export interface AnalyticsBarchart {
    location: String;
    data_value: String;
}

export interface AnalyticsBarchartResponse {
    success: Boolean;
    barchart_data: AnalyticsBarchart[];
}
