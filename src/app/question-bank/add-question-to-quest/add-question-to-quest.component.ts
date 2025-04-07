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
import { Quest } from '../../shared/models/quest.model';
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
export class AddQuestionToQuestComponent implements OnInit {
  quest: Quest | null = null;
  allQuestions: SubmittedQuestion[] = []; // Store all questions
  filteredQuestions: SubmittedQuestion[] = []; // Store filtered questions

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
      this.filteredQuestions = questions; // Set initial filtered questions to all questions
    });
  }

  ngOnInit(): void { }

  // Method to filter questions based on the input text
  filterQuestions(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const searchTerm = target.value.trim().toLowerCase();
      this.filteredQuestions = this.allQuestions.filter(q =>
        q.questionText.toLowerCase().includes(searchTerm)
      );
    }
  }

  
  addQuestionToQuest(question: SubmittedQuestion): void {
    if (!this.quest || !this.quest.id) {
      console.error('Quest or Quest ID is missing');
      return;
    }
  
    console.log('Adding question to quest:', question); // Debugging log
  
    this.questService.addQuestionToQuest(this.quest, question).subscribe({
      next: () => {
        this.snackBar.open('Question added to quest!', '', { duration: 3000 });
      },
      error: (err: any) => {
        console.error('Error adding question:', err);
        this.snackBar.open('Failed to add question to quest: ' + err, '', { duration: 3000 });
      }
    });
  }
  

  
  onAddToQuest(question: SubmittedQuestion): void {
    this.addQuestionToQuest(question);  
  }

  removeQuestionFromQuest(question: SubmittedQuestion) {
    console.log('Received event to remove question:', question); 
    this.questService.removeQuestionFromQuest(this.quest!, question).subscribe(() => {
      console.log('Question removed successfully');
    });
  }
  
}
