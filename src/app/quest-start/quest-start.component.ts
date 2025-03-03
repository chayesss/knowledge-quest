import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { Quest } from '../shared/models/quest.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-quest-start',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDividerModule],
  templateUrl: './quest-start.component.html',
  styleUrl: './quest-start.component.scss'
})
export class QuestStartComponent {
  quest: Quest | null = null;
  teamsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questService: QuestService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.teamsForm = this.formBuilder.group({
      teams: this.formBuilder.array([])
    });
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
      });
    });
  }

  ngOnInit() {
    this.addTeam();
    this.addTeam();
  }

  get teams() {
    return this.teamsForm.get('teams') as FormArray;
  }

  addTeam() {
    const newTeamGroup = this.formBuilder.group({
      text: ['', Validators.required],
    });
    this.teams.push(newTeamGroup);
  }

  removeTeam(index: number) {
    this.teams.removeAt(index);
  }

  startQuest() {
    const teams = this.teamsForm.value.teams.map((team: any) => {
      return { name: team.text, points: 0 };
    });
    this.questService.startQuest(this.quest!.id!, teams).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/quest/play/', data], {
        state: { quest: data }
      });
    });

  }
}
