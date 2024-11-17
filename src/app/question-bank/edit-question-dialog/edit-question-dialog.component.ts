import { CommonModule } from '@angular/common';
import { Component, Inject, Input, input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Answer, SubmittedQuestion } from '../../shared/models/question.model';
import { SubmitQuestionService } from '../../shared/services/submit-question.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { QuestService } from '../../shared/services/quest.service';

@Component({
  selector: 'app-edit-question-dialog',
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
  templateUrl: './edit-question-dialog.component.html',
  styleUrl: './edit-question-dialog.component.scss'
})
export class EditQuestionDialogComponent implements OnInit {
  editQuestionForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private questService: QuestService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      questionText: any;
      options: any;
      id: string,
    }
  ) {
    this.editQuestionForm = this.formBuilder.group({
      question: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }


  ngOnInit(): void {
    console.log(this.data)
    // Populate the form with the data if available
    if (this.data) {
      this.editQuestionForm.patchValue({
        question: this.data.questionText,
      });


      this.data.options.forEach((option: Answer) => {
        const newAnswerGroup = this.formBuilder.group({
          text: [option.answerText, Validators.required],
          correct: [option.isCorrect]
        });

        this.answers.push(newAnswerGroup)
      });
    }
    console.log(this.editQuestionForm)
  }

  get answers() {
    return this.editQuestionForm.get('answers') as FormArray;
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

  updateQuestion() {
    throw new Error('Method not implemented.');
  }
}
