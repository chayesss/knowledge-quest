import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { quest } from '../models/quest.model';
import { from, Observable } from 'rxjs';
import { item } from '../models/item.model';
import { SubmittedQuestion } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private firestore: Firestore
  ) { }

  submitQuest(quest: quest) {
    return from(addDoc(collection(this.firestore, 'submittedNewQuest'), quest))
  }

  getQuest(): Observable<quest[]> {
    const itemCollection = collection(this.firestore, 'submittedNewQuest');
    // Add { idField: 'id' } to include document ID in each quest object
    const data = collectionData<quest>(itemCollection, { idField: 'id' });
    return data;
  }

  getQuestById(id: string): Observable<quest> {
    const questDocRef = doc(this.firestore, `submittedNewQuest/${id}`);
    const data = getDoc(questDocRef).then(doc => {
      const questData = doc.data() as quest;
      questData.id = doc.id;
      return questData;
    });
    return from(data);
  }

  updateQuest(id: string, updatedQuest: Partial<quest>) {
    const questDocRef = doc(this.firestore, `submittedNewQuest/${id}`);
    return from(updateDoc(questDocRef, { ...updatedQuest }));
  }

  addQuestionToQuest(quest: quest, question: SubmittedQuestion) { 
    quest.questions.push(question);
    const questDocRef = doc(this.firestore, `submittedNewQuest/${quest.id}`);
    return from(updateDoc(questDocRef, { questions: [...quest.questions] }));
  }
}
