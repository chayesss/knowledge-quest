import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
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

}
