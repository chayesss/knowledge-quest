import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Quest } from '../shared/models/quest.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  title = "knowledge-quest"
  currentYear = new Date().getFullYear()
  currentIndex = 0
  quests: Quest[] = [
    {
      questName: "Ancient Civilizations",
      questSubject: "History",
      questDescription: "Explore the wonders of ancient Egypt, Greece, and Rome through interactive challenges.",
      createdBy: "Admin",
      createdOn: new Date(),
      questions: []
    },
    {
      questName: "Algebra Fundamentals",
      questSubject: "Mathematics",
      questDescription: "Master the basics of algebra with step-by-step problems and visual explanations.",
      createdBy: "Admin",
      createdOn: new Date(),
      questions: []
    },
    {
      questName: "The Solar System",
      questSubject: "Science",
      questDescription: "Journey through our solar system and learn about planets, moons, and space phenomena.",
      createdBy: "Admin",
      createdOn: new Date(),
      questions: []
    },
    {
      questName: "Grammar Adventures",
      questSubject: "English",
      questDescription: "Improve grammar skills through engaging stories and interactive exercises.",
      createdBy: "Admin",
      createdOn: new Date(),
      questions: []
     },
    {
      questName: "Coding Basics",
      questSubject: "Computer Science",
      questDescription: "Learn the fundamentals of coding through fun, game-based challenges.",
      createdBy: "Admin",
      createdOn: new Date(),
      questions: []
    },
  ]

  visibleQuests: Quest[] = []

  ngOnInit() {
    this.updateVisibleQuests()
    // Check for window resize to update visible quests
    window.addEventListener("resize", () => {
      this.updateVisibleQuests()
    })
  }

  updateVisibleQuests() {
    const isMobile = window.innerWidth < 768
    const itemsToShow = isMobile ? 1 : 3

    this.visibleQuests = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (this.currentIndex + i) % this.quests.length
      this.visibleQuests.push(this.quests[index])
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.quests.length
    this.updateVisibleQuests()
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.quests.length) % this.quests.length
    this.updateVisibleQuests()
  }

  goToSlide(index: number) {
    this.currentIndex = index
    this.updateVisibleQuests()
  }
}
