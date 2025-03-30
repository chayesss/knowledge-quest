import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { SubmittedQuestion } from '../models/question.model';
import { from, of } from 'rxjs';
import { QuestService } from './quest.service';
import { Quest } from '../models/quest.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private firestore: Firestore,
    private questService: QuestService,
  ) { }

  submitQuestion(question: SubmittedQuestion) {
    return from(addDoc(collection(this.firestore, 'submittedQuestions'), question))
  }

  updateQuestion(question: SubmittedQuestion, id: string) {
    const questDocRef = doc(this.firestore, `submittedQuestions/${id}`);
    return from(updateDoc(questDocRef, { ...question }));
  }

  getQuestions() {
    const questionsCollection = collection(this.firestore, 'submittedQuestions');
    return from(collectionData(questionsCollection, { idField: 'id' }));
  }

  bulkSubmitQuestions(questions: SubmittedQuestion[], userid: string, quest: Quest) {
    questions.forEach(question => {
      question.createdBy = userid;
      question.createdOn = new Date();
      this.submitQuestion(question)    
      this.questService.addQuestionToQuest(quest, question).subscribe({
        next: () => {
        },
        error: (err: any) => {
          console.error('Error adding question:', err);
        }
      });
    });
    return of(true);
  }

}
