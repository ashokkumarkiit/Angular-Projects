/* Class Used to hold the Exercise */
export interface Exercise {
    id: Number;
    name: String;
    description: String;
}

export interface ExerciseResponse {
    success: Boolean;
    exercises: Exercise[];
}
