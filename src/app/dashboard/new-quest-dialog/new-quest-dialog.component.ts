import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuestService } from '../../shared/services/quest.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { quest } from '../../shared/models/quest.model';

@Component({
  selector: 'app-new-quest-dialog',
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
  templateUrl: './new-quest-dialog.component.html',
  styleUrl: './new-quest-dialog.component.scss'
})
export class QuestDialogComponent {

  QuestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questService: QuestService,
    private snackBar: MatSnackBar

  ) {
    this.QuestForm = this.formBuilder.group({
      questName: ['', Validators.required],
      questDescription: [''],
      questSubject: ['', Validators.required]
    });
  }

  submitQuest() {
    if (this.QuestForm.valid) {
      var quest: quest = {
        questName: this.QuestForm.value.questName,
        questDescription: this.QuestForm.value.questDescription,
        questSubject: this.QuestForm.value.questSubject
      }
    
      this.questService.submitQuest(quest).subscribe({
        next: (response: any) => {
          this.snackBar.open('Quest Submitted! ID: ' + response.id, '', {
            duration: 3000
          })
        },
        error: (err: any) => {
          this.snackBar.open('Quest Failed to Submit ' + err, '', {
            duration: 3000,
          })
        }
      })
    }
  }

}
