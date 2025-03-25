import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { QuestDialogComponent } from './new-quest-dialog/new-quest-dialog.component';
import { EditQuestDialogComponent } from './edit-quest-dialog/edit-quest-dialog.component';
import { QuestService } from '../shared/services/quest.service';
import { AuthService } from '../shared/services/auth.service';
import { Quest } from '../shared/models/quest.model';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { QuestCardComponent } from "../shared/quest-card/quest-card.component"; // Import FormsModule for ngModel

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    QuestCardComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title: string = 'knowledge-quest';
  quests: Quest[] = [];
  filteredQuests: Quest[] = []; // List for displaying filtered quests
  searchTerm: string = '';
  user: User | undefined;

  constructor(
    private dialog: MatDialog,
    private questService: QuestService,
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
    this.questService.getQuest().subscribe((data: Quest[]) => {
      this.quests = data;
      this.filteredQuests = data; // Initialize filtered list
    });
  }

  trackByIndex(index: number, quest: Quest): number {
    return index;
  }

  filterQuests() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();
    this.filteredQuests = this.quests.filter(q =>
      q.questName.toLowerCase().includes(lowerSearchTerm) ||
      (q.questSubject && q.questSubject.toLowerCase().includes(lowerSearchTerm)) ||
      (q.questDescription && q.questDescription.toLowerCase().includes(lowerSearchTerm))
    );
  }

  openQuestDialog() {
    this.dialog.open(QuestDialogComponent, {
      minWidth: '700px',
      height: '300px'
    });
  }

  openEditQuestDialog(quest: Quest): void {
    this.dialog.open(EditQuestDialogComponent, {
      minWidth: '700px',
      height: '550px',
      data: quest
    });
  }

  previewQuest(questId: string) {
    this.router.navigate(['/quest/preview/', questId], {
      state: { quest: questId }
    });
  }
}
