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
import { DialogConfig } from '@angular/cdk/dialog';
import { QuestDialogComponent } from './new-quest-dialog/new-quest-dialog.component';
import { QuestService } from '../shared/services/quest.service';
import { get } from 'http';
import { quest } from '../shared/models/quest.model';
import { EditQuestDialogComponent } from './edit-quest-dialog/edit-quest-dialog.component';
import { User } from 'firebase/auth';
import { AuthService } from '../shared/services/auth.service';

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
  quests: quest[] = [];
  test: string = 'testing';
  user: User | undefined;

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private QuestService: QuestService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe((currentUser) => {
      if (currentUser) {
        this.user = currentUser;
      }
    });
  }

  ngOnInit(): void {
    var getQuest = this.QuestService.getQuest().subscribe((data: any) => {this.quests = data}) ;
 
  }

  trackByIndex(index: number, quest: any): number {
    return index;
  }
  

  async onCreateItem(name: string) {

    var item: item = {
      name: name,
      createdOn: Date.now().toString(),
    }

    var docRef = await addDoc(collection(this.firestore, 'items'), item);

    console.log('Doc written with ID: ', docRef.id)
  }

  

  openQuestDialog() {
    this.dialog.open(QuestDialogComponent, {
      minWidth: '700px',
      height: '550px'
    })
  }

  openEditQuestDialog(quest: any): void {
    this.dialog.open(EditQuestDialogComponent, {
      minWidth: '700px',
      height: '550px',
      data: quest
    });
  }

}
