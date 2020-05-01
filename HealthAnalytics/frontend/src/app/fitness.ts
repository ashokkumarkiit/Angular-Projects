/* Class Used to hold the Exercise */
export interface Fitness {
    formatted_address: String;
    latitude: String;
    longitude: String;
    name: String;
    photos_url: String;
    rating: String;
    place_id: String;
}

export interface FitnessResponse {
    success: Boolean;
    search_result: Fitness[];
}
