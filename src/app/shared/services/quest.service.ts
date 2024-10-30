import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { NewQuest } from '../models/quest.model';
import { from } from 'rxjs';
import { item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private firestore: Firestore
  ) { }

  submitNewQuest(newQuest: NewQuest) {
    return from(addDoc(collection(this.firestore, 'submittedNewQuest'), newQuest))
  }

  getNewQuest() {
    var itemCollection = collection(this.firestore, 'submittedNewQuest');
    console.log(itemCollection)
    var data = collectionData<NewQuest>(itemCollection, { name: 'submittedNewQuest' });
    return data;
  }
}
