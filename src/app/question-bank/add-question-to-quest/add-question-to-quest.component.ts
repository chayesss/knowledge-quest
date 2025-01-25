import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { User } from 'firebase/auth';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { SubmitQuestionDialogComponent } from '../../dashboard/submit-question-dialog/submit-question-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { EditQuestionDialogComponent } from '../edit-question-dialog/edit-question-dialog.component';
import { quest } from '../../shared/models/quest.model';
import { QuestionsComponent } from "../questions/questions.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestService } from '../../shared/services/quest.service';

@Component({
  selector: 'app-add-question-to-quest',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatIcon, QuestionsComponent, RouterModule],
  templateUrl: './add-question-to-quest.component.html',
  styleUrl: './add-question-to-quest.component.scss'
})
export class AddQuestionToQuestComponent {
  quest: quest | null = null;

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
  ) {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
      });
    });
  }
}
