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
import { SubmittedQuestion } from '../../shared/models/question.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionService } from '../../shared/services/question.service';
import { quest } from '../../shared/models/quest.model';

@Component({
  selector: 'app-questions',
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
    MatProgressSpinnerModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  @Input() quest: quest | null = null;
  [x: string]: any;
  user!: User | null;
  questions: SubmittedQuestion[] = [];
  questionsEditable: boolean = true;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.getQuestions();
      }
    });

    if (this.quest) {
      this.questionsEditable = false;
    }
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }


  openEditQuestionDialog(question: any): void {
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
    })
  }
}
