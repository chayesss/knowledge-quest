import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { quest } from '../models/quest.model';
import { from, Observable } from 'rxjs';
import { item } from '../models/item.model';

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

  updateQuest(id: string, updatedQuest: Partial<quest>) {
    const questDocRef = doc(this.firestore, `submittedNewQuest/${id}`);
    return from(updateDoc(questDocRef, { ...updatedQuest }));
  }
}
