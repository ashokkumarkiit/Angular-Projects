import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WgerService } from './../../wger.service';
import { Exercise } from 'src/app/exercise';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[];

  constructor(
    private route: ActivatedRoute,
    private wgerService: WgerService) { }

  ngOnInit() {
    this.getExerciseCategories();
  }

  getExerciseCategories(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wgerService.getExerciseByCategory(id).subscribe(
      res => this.exercises = res.exercises
    );
  }

}
