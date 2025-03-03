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
import { Quest } from '../shared/models/quest.model';
import { QuestService } from '../shared/services/quest.service';
import { SubmittedQuestion } from '../shared/models/question.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

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
    QuestionsComponent,
    FormsModule // Added for ngModel
  ],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent implements OnInit {
  user!: User | null;
  questions: SubmittedQuestion[] = [];
  filteredQuestions: SubmittedQuestion[] = [];
  quest: Quest | null = null;
  loading = true; // Track loading state

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private questionService: QuestionService,
    private questService: QuestService,
    private snackBar: MatSnackBar
  ) { }

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
      this.filteredQuestions = questions;
      this.loading = false; // Stop loading once data is fetched
    }, () => {
      this.loading = false; // Ensure loading stops on error
    });
  }

  filterQuestions(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      const searchTerm = target.value.trim().toLowerCase();
      this.filteredQuestions = this.questions.filter(q =>
        q.questionText.toLowerCase().includes(searchTerm)
      );
    }
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

  removeQuestionFromQuest(question: SubmittedQuestion) {
    console.log('Received event to remove question:', question);
    this.questService.removeQuestionFromQuest(this.quest!, question).subscribe(() => {
      console.log('Question removed successfully');
    });
  }
  
}
