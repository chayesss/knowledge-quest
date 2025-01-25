import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuestService } from '../../shared/services/quest.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef  } from '@angular/material/dialog';
import { quest } from '../../shared/models/quest.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-quest-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './edit-quest-dialog.component.html',
  styleUrl: './edit-quest-dialog.component.scss'
})

export class EditQuestDialogComponent implements OnInit {
  editQuestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questService: QuestService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditQuestDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      questName: any;
      questDescription: any;
      questSubject: any; id: string, questData: quest 
  }
  ) {
    this.editQuestForm = this.formBuilder.group({
      questName: ['', Validators.required],
      questDescription: [''],
      questSubject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Populate the form with the data if available
    if (this.data) {
      this.editQuestForm.patchValue({
        questName: this.data.questName,
        questDescription: this.data.questDescription,
        questSubject: this.data.questSubject
      });
    }
  }

  onEditSubmit() {
    if (this.editQuestForm.valid) {
      this.questService.updateQuest(this.data.id, this.editQuestForm.value).subscribe(() => {
        this.snackBar.open('Quest updated successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true); 
      }, (error) => {
        this.snackBar.open(`Error: ${error.message}`, 'Close', { duration: 3000 });
      });
    }
  }
  onAddQuestion() {
    this.dialogRef.close(true);
    this.router.navigate(['/quest/add-questions/', this.data.id], {
      state: {quest: this.data}
    })
  }
}
