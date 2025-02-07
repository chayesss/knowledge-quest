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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title: string = 'knowledge-quest';
  quests: quest[] = [];
  test: string = 'testing';
  user: User | undefined;

  constructor(
    private firestore: Firestore,
    private dialog: MatDialog,
    private QuestService: QuestService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.getCurrentUser().subscribe((currentUser) => {
      if (currentUser) {
        this.user = currentUser;
      }
    });
  }

  ngOnInit(): void {
    this.QuestService.getQuest().subscribe((data: any) => {this.quests = data}) ;
  }

  trackByIndex(index: number, quest: any): number {
    return index;
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


  previewQuest(questId: any) {
    this.router.navigate(['/quest/preview/', questId], {
      state: {quest: questId}
    })
  }
}
