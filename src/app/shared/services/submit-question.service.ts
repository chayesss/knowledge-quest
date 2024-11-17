import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { SubmittedQuestion } from '../models/question.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitQuestionService {

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
}
