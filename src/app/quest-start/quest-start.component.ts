import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { quest } from '../shared/models/quest.model';

@Component({
  selector: 'app-quest-start',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quest-start.component.html',
  styleUrl: './quest-start.component.scss'
})
export class QuestStartComponent {
  teamForm: FormGroup
  teams: string[] = []
  quest: quest | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private questService: QuestService,
  ) {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
      });
    });
    this.teamForm = this.fb.group({
      teamName: ["", Validators.required],
    })
  }

  addTeam() {
    if (this.teamForm.valid) {
      const teamName = this.teamForm.get("teamName")?.value
      this.teams.push(teamName)
      this.teamForm.reset()
    }
  }

  removeTeam(index: number) {
    this.teams.splice(index, 1)
  }

  startQuest() {
    // Implement the logic to start the quest
    console.log("Starting quest with teams:", this.teams)
  }
}
