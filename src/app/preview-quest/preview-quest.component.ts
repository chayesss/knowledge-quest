import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { quest } from '../shared/models/quest.model';
import { QuestionsComponent } from "../question-bank/questions/questions.component";
import { MatDialog } from '@angular/material/dialog';
import { EditQuestDialogComponent } from '../dashboard/edit-quest-dialog/edit-quest-dialog.component';

@Component({
  selector: 'app-preview-quest',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTabsModule, MatListModule, RouterModule, QuestionsComponent],
  templateUrl: './preview-quest.component.html',
  styleUrl: './preview-quest.component.scss'
})
export class PreviewQuestComponent {
  quest: quest | null = null;

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
    private dialog: MatDialog,
  ) {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
      });
    });
  }

  openEditQuestDialog(quest: any): void {
    this.dialog.open(EditQuestDialogComponent, {
      minWidth: '700px',
      height: '550px',
      data: quest
    });
  }

  onTabChange($event: MatTabChangeEvent) {
    throw new Error('Method not implemented.');
  }

}
