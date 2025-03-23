import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Quest } from '../models/quest.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quest-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CommonModule, MatButtonModule],
  templateUrl: './quest-card.component.html',
  styleUrl: './quest-card.component.scss'
})
export class QuestCardComponent {
  @Input() quest!: Quest | null;

}
