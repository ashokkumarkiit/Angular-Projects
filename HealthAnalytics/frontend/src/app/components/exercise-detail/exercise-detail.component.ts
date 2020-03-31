import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WgerService } from './../../wger.service';
import { ExerciseMuscle } from 'src/app/exercise-muscle';
import { ExerciseEquipment } from 'src/app/exercise-equipment';
import { ExerciseDetail } from 'src/app/exercise-detail';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {

  exercise_detail: ExerciseDetail;
  exercise_muscle: ExerciseMuscle[];
  exercise_equipment: ExerciseEquipment[];
  front_muscle: {};
  back_muscle: {};
  test = {'background-image': 'url(/assets/muscles/main/muscle-1.svg),url(/assets/muscles/muscular_system_front.svg)'};

  constructor(
    private route: ActivatedRoute,
    private wgerService: WgerService) { }

  ngOnInit() {
    this.getExerciseDetail();
    this.getExerciseMuscle();
    this.getExerciseEquipment();
  }

  getExerciseDetail(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wgerService.getExerciseDetail(id).subscribe(
      res => this.exercise_detail = res.exercise_detail[0]
    );
  }

  getExerciseMuscle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wgerService.getExerciseMuscles(id).subscribe(
      res => {
        this.exercise_muscle = res.exercise_muscle;
        let urlFront = [];
        let urlBack = [];
        urlFront = res.exercise_muscle.map(m => {
          return m.is_front ? `url(/assets/muscles/main/muscle-${m.mu_id}.svg)` : '';
        });

        urlBack = res.exercise_muscle.map(m => {
          return m.is_front ? '' : `url(/assets/muscles/main/muscle-${m.mu_id}.svg)`;
        });
        console.log('urlFront' + urlFront);
        console.log('urlBack' + urlBack);
        let f_url = '';
        for (let i = 0; i < urlFront.length; i++) {
          if (urlFront[i] !== '') {
            f_url += urlFront[i] + ',' ;
          }
        }
        f_url += 'url(/assets/muscles/muscular_system_front.svg)';

        let b_url = '';
        for (let i = 0; i < urlBack.length; i++) {
          if (urlBack[i] !== '') {
            b_url += urlBack[i] + ',' ;
          }
        }
        b_url += 'url(/assets/muscles/muscular_system_back.svg)';

        // url += 'url(/assets/muscles/muscular_system_front.svg)';
        // console.log(url);
        /*this.front_muscle = {
          'background-image' : url,
        };*/

        this.front_muscle = { 'background-image' : f_url };
        this.back_muscle = { 'background-image' : b_url };
        console.log(this.front_muscle);
        console.log(this.back_muscle);
      }
    );
  }

  getExerciseEquipment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.wgerService.getExerciseEquipments(id).subscribe(
      res => this.exercise_equipment = res.exercise_equipment
    );
  }

}
