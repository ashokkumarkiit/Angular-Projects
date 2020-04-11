/* Class Used to hold the Country wise total values */
export interface MapData {
    province_state: String;
    country_region: String;
    radius: String;
    fillKey: String;
    confirmed: String;
    deaths: String;
    recovered: String;
    active: String;
    latitude: String;
    longitude: String;
}

export interface MapDataResponse {
    success: Boolean;
    world_location: MapData[];
}
