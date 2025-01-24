import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { SubmittedQuestion } from '../models/question.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private firestore: Firestore
  ) { }

  submitQuestion(question: SubmittedQuestion) {
    return from(addDoc(collection(this.firestore, 'submittedQuestions'), question))
  }

  updateQuestion(question: SubmittedQuestion, id: string) {
    console.log(question)
    const questDocRef = doc(this.firestore, `submittedQuestions/${id}`);
    console.log(questDocRef)
    return from(updateDoc(questDocRef, { ...question }));
  }

  getQuestions() {
    const questionsCollection = collection(this.firestore, 'submittedQuestions');
    return from(collectionData(questionsCollection, { idField: 'id' }));
  }
}
