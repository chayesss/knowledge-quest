import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Answer, SubmittedQuestion } from '../../shared/models/question.model';
import { SubmitQuestionService } from '../../shared/services/submit-question.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  selector: 'app-submit-question-dialog',
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
    RouterModule],
  templateUrl: './submit-question-dialog.component.html',
  styleUrl: './submit-question-dialog.component.scss'
})
export class SubmitQuestionDialogComponent {

  questionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: SubmitQuestionService,
    private snackBar: MatSnackBar
  ) {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    // have a minimum of 2 answers 
    this.addAnswer();
    this.addAnswer();
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    const newAnswerGroup = this.formBuilder.group({
      text: ['', Validators.required],
      correct: [false]
    });
    this.answers.push(newAnswerGroup);
    console.log(this.answers)
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      console.log('Submitted:', this.questionForm.value);

      var answers = this.questionForm.value.answers.map((answer: { text: any; correct: any; }) => {
        var tempAnswer: Answer = {
          answerText: answer.text,
          isCorrect: answer.correct,
        }

        return tempAnswer;
      });

      var question: SubmittedQuestion = {
        questionText: this.questionForm.value.question,
        options: answers,
        status: "PENDING"
      }

      this.questionService.submitQuestion(question).subscribe({
        next: (response) => {

          this.snackBar.open('Question Submitted! ID: ' + response.id, '', {
            duration: 3000
          })
        },
        error: (err) => {
          this.snackBar.open('Question Failed to Submit ' + err, '', {
            duration: 3000,
          })
        }
      })
    }
  }

  resetForm() {
    this.questionForm.reset();
    while (this.answers.length > 2) {
      this.answers.removeAt(this.answers.length - 1);
    }
  }
}
