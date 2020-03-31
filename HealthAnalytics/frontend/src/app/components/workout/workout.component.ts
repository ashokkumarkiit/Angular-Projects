import { Component, OnInit } from '@angular/core';
import { WgerService } from './../../wger.service';
import { ExerciseCategory } from 'src/app/exercise-category';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  exerciseCategory: ExerciseCategory[];

  constructor(private wgerService: WgerService) { }

  ngOnInit(): void {
    // Initialization Logic
    this.getExerciseCategories();
  }

  getExerciseCategories(): void {
    this.wgerService.getExerciseCategory().subscribe(
      res => this.exerciseCategory = res.exercise_category
    );
  }

}
