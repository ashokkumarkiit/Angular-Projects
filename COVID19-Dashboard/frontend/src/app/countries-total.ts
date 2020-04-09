/* Class Used to hold the Country wise total values */
export interface CountriesTotal {
    country_region: String;
    total: String;
}

export interface CountriesTotalResponse {
    success: Boolean;
    countries_total: CountriesTotal[];
}
