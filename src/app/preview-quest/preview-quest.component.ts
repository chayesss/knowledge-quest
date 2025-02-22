import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuestService } from '../shared/services/quest.service';
import { quest } from '../shared/models/quest.model';
import { QuestionsComponent } from "../question-bank/questions/questions.component";
import { MatDialog } from '@angular/material/dialog';
import { EditQuestDialogComponent } from '../dashboard/edit-quest-dialog/edit-quest-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../shared/services/question.service';
import { SubmittedQuestion } from '../shared/models/question.model';

@Component({
  selector: 'app-preview-quest',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatTabsModule, MatListModule, RouterModule, QuestionsComponent, MatProgressSpinnerModule],
  templateUrl: './preview-quest.component.html',
  styleUrls: ['./preview-quest.component.scss']
})
export class PreviewQuestComponent implements OnInit {
  quest: quest | null = null;
  allQuestions: SubmittedQuestion[] = [];
  isLoading = true;  // Add a loading state
  error: string | null = null;  // Handle error message

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
    private dialog: MatDialog,
    private questionService: QuestionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
        // After the quest is fetched, check if it has questions
        if (!quest?.questions || quest.questions.length === 0) {
          this.fetchAllQuestions();  // If no questions, fetch all questions
        }
        this.isLoading = false;  // Data is loaded
      }, error => {
        this.error = "Error fetching quest";
        this.isLoading = false;  // Data is loaded
      });
    });
  }

  openEditQuestDialog(quest: any): void {
    this.dialog.open(EditQuestDialogComponent, {
      minWidth: '700px',
      height: '550px',
      data: quest
    });
  }

  fetchAllQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.allQuestions = questions;
    }, error => {
      this.error = "Error fetching questions";
    });
  }

  onTabChange($event: MatTabChangeEvent) {
    // Handle tab changes if needed
  }

  startQuest() {
    this.router.navigate(['/quest/start/', this.quest?.id], {
      state: { quest: this.quest?.id }
    });
  }
}
