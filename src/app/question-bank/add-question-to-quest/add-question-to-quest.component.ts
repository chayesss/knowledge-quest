import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { User } from 'firebase/auth';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { SubmitQuestionDialogComponent } from '../../dashboard/submit-question-dialog/submit-question-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { EditQuestionDialogComponent } from '../edit-question-dialog/edit-question-dialog.component';
import { quest } from '../../shared/models/quest.model';

@Component({
  selector: 'app-add-question-to-quest',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatIcon],
  templateUrl: './add-question-to-quest.component.html',
  styleUrl: './add-question-to-quest.component.scss'
})
export class AddQuestionToQuestComponent {
  @Input() quest!: quest;
  
}
