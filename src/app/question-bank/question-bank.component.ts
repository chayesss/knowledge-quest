import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { item } from '../shared/models/item.model';
import { Firestore, collectionData, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatIcon],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {

  questions$: Observable<any[]>; 

  constructor(private firestore: Firestore, private dialog: MatDialog) {
    const questionsCollection = collection(this.firestore, 'submittedQuestions'); 
    this.questions$ = collectionData(questionsCollection, { idField: 'id' }); 

}

  openEditQuestionDialog(question: any): void {
    this.dialog.open(EditQuestionDialogComponent, {
      width: '600px',
      data: { questionId: question.id }
    });
  }
}
