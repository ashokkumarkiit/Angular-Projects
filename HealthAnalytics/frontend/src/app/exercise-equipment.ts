/* Class Used to hold the Exercise Equipment */
export interface ExerciseEquipment {
    ex_id: Number;
    name: String;
}

export interface ExerciseEquipmentResponse {
    success: Boolean;
    exercise_equipment: ExerciseEquipment[];
}
