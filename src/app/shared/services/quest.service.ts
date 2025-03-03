import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { CompletedQuest, Quest } from '../models/quest.model';
import { from, map, Observable } from 'rxjs';
import { SubmittedQuestion } from '../models/question.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private firestore: Firestore
  ) { }

  submitQuest(quest: Quest) {
    return from(addDoc(collection(this.firestore, 'submittedNewQuest'), quest))
  }

  getQuest(): Observable<Quest[]> {
    const itemCollection = collection(this.firestore, 'submittedNewQuest');
    // Add { idField: 'id' } to include document ID in each quest object
    const data = collectionData<Quest>(itemCollection, { idField: 'id' });
    return data;
  }

  getQuestById(id: string): Observable<Quest> {
    const questDocRef = doc(this.firestore, `submittedNewQuest/${id}`);
    const data = getDoc(questDocRef).then(doc => {
      const questData = doc.data() as Quest;
      questData.id = doc.id;
      return questData;
    });
    return from(data);
  }

  getCompletedQuestById(id: string): Observable<CompletedQuest> {
    const questDocRef = doc(this.firestore, `completedQuests/${id}`);
    const data = getDoc(questDocRef).then(doc => {
      const questData = doc.data() as CompletedQuest;
      questData.id = doc.id;
      return questData;
    });
    return from(data);
  }

  updateQuest(id: string, updatedQuest: Partial<Quest>) {
    const questDocRef = doc(this.firestore, `submittedNewQuest/${id}`);
    return from(updateDoc(questDocRef, { ...updatedQuest }));
  }

  addQuestionToQuest(quest: Quest, question: SubmittedQuestion) {
    quest.questions.push(question);
    const questDocRef = doc(this.firestore, `submittedNewQuest/${quest.id}`);
    return from(updateDoc(questDocRef, { questions: [...quest.questions] }));
  }

  startQuest(questId: string, teams: Team[]) {
    const completedQuest: CompletedQuest = {
      questId: questId,
      teams: teams,
    }
    var docRef = addDoc(collection(this.firestore, 'completedQuests'), completedQuest).then(docRef => { const completedQuestId = docRef.id as string; return completedQuestId });
    return from(docRef);
  }
  
  removeQuestionFromQuest(quest: quest, question: SubmittedQuestion) { 
    // Filter out the removed question
    quest.questions = quest.questions.filter(q => q.questionText !== question.questionText);
    
    const questDocRef = doc(this.firestore, `submittedNewQuest/${quest.id}`);
    return from(updateDoc(questDocRef, { questions: [...quest.questions] }));
  }
  
}
