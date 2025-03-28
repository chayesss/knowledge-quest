import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { Quest } from '../shared/models/quest.model';
import { QuestionsComponent } from "../question-bank/questions/questions.component";
import { MatDialog } from '@angular/material/dialog';
import { EditQuestDialogComponent } from '../dashboard/edit-quest-dialog/edit-quest-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../shared/services/question.service';
import { SubmittedQuestion } from '../shared/models/question.model';
import { AuthService } from '../shared/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-preview-quest',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTabsModule, MatListModule, RouterModule, QuestionsComponent, MatProgressSpinnerModule],
  templateUrl: './preview-quest.component.html',
  styleUrls: ['./preview-quest.component.scss']
})
export class PreviewQuestComponent implements OnInit {
  quest: Quest | null = null;
  allQuestions: SubmittedQuestion[] = [];
  isLoading = true;  // Add a loading state
  error: string | null = null;  // Handle error message
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
    private dialog: MatDialog,
    private questionService: QuestionService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe({
        next: (quest) => {
          this.quest = quest;
          this.authService.getCurrentUser().subscribe({
            next: user => {
              this.user = user!
              this.isLoading = false;
            },
            error: e => {
              console.error(e)
            }
          })
        },
        error: (e) => {
          console.log(e);
        }
      })
    });

  }

  openEditQuestDialog(quest: any): void {
    this.dialog.open(EditQuestDialogComponent, {
      minWidth: '700px',
      height: '320px',
      data: quest
    });
  }

  fetchAllQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.allQuestions = questions;
    }, error => {
      this.error = "Error fetching questions";
    });
  }


  startQuest() {
    this.router.navigate(['/quest/start/', this.quest?.id], {
      state: { quest: this.quest?.id }
    });
  }
}
