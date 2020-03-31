/* Class Used to hold the Exercise Detail */
export interface ExerciseDetail {
    id: Number;
    name: String;
    description: String;
    ex_cat_name: String;
}

export interface ExerciseDetailResponse {
    success: Boolean;
    exercise_detail: ExerciseDetail[];
}
