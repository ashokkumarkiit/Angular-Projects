/* Class Used to hold the Exercise */
export interface CovidData {
    report_date: String;
    total: Number;
    data_type: String;
    category: String;
}

export interface CovidCustomData {
    confirmed: CovidData[],
    confirmed_predict: CovidData[],
    deaths: CovidData[],
    deaths_predict: CovidData[]
}

export interface CovidDataResponse {
    success: Boolean;
    covid_data: CovidCustomData;
}
