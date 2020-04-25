/* Class Used to hold the Exercise */
export interface DDLSelect {
    option_value: String;
}

export interface DDLSelectResponse {
    success: Boolean;
    select_value: DDLSelect[];
}
