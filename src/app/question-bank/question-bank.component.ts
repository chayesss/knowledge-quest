import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SubmitQuestionDialogComponent } from '../dashboard/submit-question-dialog/submit-question-dialog.component';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';
import { User } from 'firebase/auth';
import { AuthService } from '../shared/services/auth.service';
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionService } from '../shared/services/question.service';
import { quest } from '../shared/models/quest.model';
import { QuestService } from '../shared/services/quest.service';
import { SubmittedQuestion } from '../shared/models/question.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIcon,
    MatSnackBarModule,
    QuestionsComponent
  ],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent implements OnInit {
  user!: User | null;
  questions: SubmittedQuestion[] = [];
  quest: quest | null = null; // This can be set dynamically

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private questionService: QuestionService,
    private questService: QuestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.getQuestions();
      }
    });
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  openEditQuestionDialog(question: SubmittedQuestion) {
    this.dialog.open(EditQuestionDialogComponent, {
      minWidth: '700px',
      height: '550px',
      data: question
    });
  }

  openSubmitQuestionDialog() {
    this.dialog.open(SubmitQuestionDialogComponent, {
      minWidth: '700px',
      height: '550px'
    });
  }

  addQuestionToQuest(question: SubmittedQuestion) {
    if (this.quest) {
      this.questService.addQuestionToQuest(this.quest, question).subscribe({
        next: () => {
          this.snackBar.open('Question added to quest!', '', { duration: 3000 });
        },
        error: (err: any) => {
          this.snackBar.open('Failed to add question to quest ' + err, '', { duration: 3000 });
        }
      });
    }
  }
}
