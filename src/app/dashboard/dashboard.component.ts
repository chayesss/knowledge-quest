import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { item } from '../shared/models/item.model';
import { Firestore, collectionData, collection, addDoc, CollectionReference } from '@angular/fire/firestore';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { MatDialog } from '@angular/material/dialog';
import { SubmitQuestionDialogComponent } from './submit-question-dialog/submit-question-dialog.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { NewQuestDialogComponent } from './new-quest-dialog/new-quest-dialog.component';
import { QuestService } from '../shared/services/quest.service';
import { get } from 'http';
import { NewQuest } from '../shared/models/quest.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // DEMONSTRATION ONLY - FIRESTORE LOGIC SHOULD BE MOVED TO A SERVICE LAYER
  title: string = 'knowledge-quest';
  quests: NewQuest[] = [];
  test: string = 'testing'

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private QuestService: QuestService
  ) {
  }

  ngOnInit(): void {
    var getQuest = this.QuestService.getNewQuest().subscribe((data: any) => {this.quests = data}) ;
 
  }

  async onCreateItem(name: string) {

    var item: item = {
      name: name,
      createdOn: Date.now().toString(),
    }

    var docRef = await addDoc(collection(this.firestore, 'items'), item);

    console.log('Doc written with ID: ', docRef.id)
  }

  openSubmitQuestionDialog() {
    this.dialog.open(SubmitQuestionDialogComponent, {
      minWidth: '700px',
      height: '550px'
    })
  }

  openNewQuestDialog() {
    this.dialog.open(NewQuestDialogComponent, {
      minWidth: '700px',
      height: '550px'
    })
  }
}
