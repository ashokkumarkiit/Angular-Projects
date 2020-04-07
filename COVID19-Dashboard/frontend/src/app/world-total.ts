/* Class Used to hold the Country wise total values */
export interface WorldTotal {
    confirmed: String;
    deaths: String;
    recovered: String;
}

export interface WorldTotalResponse {
    success: Boolean;
    world_total: WorldTotal[];
}
