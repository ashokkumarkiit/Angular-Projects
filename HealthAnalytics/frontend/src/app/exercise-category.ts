/* Class Used to hold the Exercise Categories */
export interface ExerciseCategory {
    id: Number;
    name: String;
}

export interface ExerciseCategoryResponse {
    success: Boolean;
    exercise_category: ExerciseCategory[];
}
