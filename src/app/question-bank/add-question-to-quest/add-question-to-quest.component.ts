import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuestService } from '../../shared/services/quest.service';
import { quest } from '../../shared/models/quest.model';
import { QuestionsComponent } from "../questions/questions.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubmittedQuestion } from '../../shared/models/question.model';
import { QuestionService } from '../../shared/services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-question-to-quest',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatIcon, QuestionsComponent, RouterModule],
  templateUrl: './add-question-to-quest.component.html',
  styleUrl: './add-question-to-quest.component.scss'
})
export class AddQuestionToQuestComponent {
  quest: quest | null = null;
  allQuestions: SubmittedQuestion[] = []; // Store all questions here
  
  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
    private snackBar: MatSnackBar,
    private questionService: QuestionService
  ) {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe(quest => {
        this.quest = quest;
      });
    });

    // Fetch all questions
    this.questionService.getQuestions().subscribe(questions => {
      this.allQuestions = questions;
    });
  }

  // Add question to the quest by calling the existing method
  addQuestionToQuest(question: SubmittedQuestion): void {
    if (this.quest) {
      this.questService.addQuestionToQuest(this.quest, question).subscribe({
        next: () => {
          this.snackBar.open('Question added to quest!', '', { duration: 3000 });
        },
        error: (err: any) => {
          this.snackBar.open('Failed to add question to quest ' + err, '', { duration: 3000 });
        }
      });
    }
  }

  onAddToQuest(question: SubmittedQuestion): void {
    this.addQuestionToQuest(question);  // Reuse the method here
  }
}
