import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { Router, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QuestService } from '../../shared/services/quest.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { quest } from '../../shared/models/quest.model';
import { AuthService } from '../../shared/services/auth.service';
import { User } from 'firebase/auth';

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
  currentUser: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private questService: QuestService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialogRef: MatDialog,
    private router: Router,
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });

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
        questSubject: this.QuestForm.value.questSubject,
        createdBy: this.currentUser!.uid,
        createdOn: new Date(),
        questions: []
      }

      this.questService.submitQuest(quest).subscribe({
        next: (response: any) => {
          this.snackBar.open('Quest Created! ID: ' + response.id, '', {
            duration: 3000
          })
          console.log("WET FARTS")
          console.log(response)
          this.router.navigate(['/quest/add-questions/', response.id])
        },
        error: (err: any) => {
          this.snackBar.open('Quest Failed to Create ' + err, '', {
            duration: 3000,
          })
        }
      })
    }
  }

}
