/* Class Used to hold the Exercise Muscle */
export interface ExerciseMuscle {
    ex_id: Number;
    mu_id: Number;
    name: String;
    is_front: Boolean;
}

export interface ExerciseMuscleResponse {
    success: Boolean;
    exercise_muscle: ExerciseMuscle[];
}
