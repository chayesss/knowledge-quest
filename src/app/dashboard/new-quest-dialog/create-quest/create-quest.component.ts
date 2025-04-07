import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Quest } from '../../../shared/models/quest.model';
import { SubmittedQuestion } from '../../../shared/models/question.model';
import { AuthService } from '../../../shared/services/auth.service';
import { QuestService } from '../../../shared/services/quest.service';
import { QuestionService } from '../../../shared/services/question.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OpenaiService } from '../../../shared/services/openai.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-quest',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatCardModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './create-quest.component.html',
  styleUrl: './create-quest.component.scss'
})
export class CreateQuestComponent {
  quest: Quest | null = null;
  allQuestions: SubmittedQuestion[] = [];
  isLoading = false;
  user: User | null = null;
  aiForm: FormGroup;
  showAIOptions = false;

  difficultyLevels = [
    { value: 'college', viewValue: 'College' },
    { value: 'highSchool', viewValue: 'High School' },
    { value: 'middleSchool', viewValue: 'Middle School' },
    { value: 'elementary', viewValue: 'Elementary' }
  ];

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService,
    private dialog: MatDialog,
    private questionService: QuestionService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private openaiService: OpenaiService
  ) {
    this.aiForm = this.fb.group({
      difficulty: ['', Validators.required],
      questionCount: [1, [Validators.required, Validators.min(1), Validators.max(25)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questService.getQuestById(params['id']).subscribe({
        next: (quest) => {
          this.quest = quest;
          this.authService.getCurrentUser().subscribe({
            next: user => {
              this.user = user!;
            },
            error: e => {
              console.error(e)
            }
          })
        },
        error: (e) => {
          console.log(e);
        }
      })
    });
  }

  toggleAIOptions() {
    this.showAIOptions = true;
  }
  createMyOwnQuestions() {
    this.router.navigate(['/quest/add-questions/', this.quest?.id])
  }
  useAIGenerateQuestions() {
    this.isLoading = true;
    this.openaiService.generateQuestions(this.quest!.questName, this.quest!.questDescription, this.quest!.questSubject, this.aiForm.value.difficulty, this.aiForm.value.questionCount).then((questions) => {
      questions.subscribe({
        next: (questions) => {
          if (questions) {
            this.questionService.bulkSubmitQuestions(questions, this.user!.uid, this.quest!).subscribe({
              next: (response) => {
                this.router.navigate(['/quest/preview/', this.quest!.id])
              },
              error: (err) => {
                console.error(err);
              }
            });
          }
          else {
            console.log(questions);
          }
        }
      });

    });
  }
}
