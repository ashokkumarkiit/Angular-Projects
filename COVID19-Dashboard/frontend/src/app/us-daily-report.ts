/* Class Used to hold the Country wise total values */
export interface USDaily {
    province_state: String;
    confirmed: String;
    deaths: String;
    recovered: String;
}

export interface USDailyResponse {
    success: Boolean;
    us_state_daily_report: USDaily[];
}
