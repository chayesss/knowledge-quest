import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { catchError, map, Observable, of } from 'rxjs';
import { SubmittedQuestion } from '../models/question.model';
import { systemText } from '../../enums/consts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private functionPath: string = 'https://us-central1-knowledgequest-dbc73.cloudfunctions.net/generateQuestions';

  constructor(private http: HttpClient) { }

  async generateQuestions(questName: string, description: string, subject: string, difficulty: string, questions: number): Promise<Observable<any>> {

    var messages = [
      {
        role: 'system',
        content: systemText,
      },
      {
        role: 'user',
        content: `Name: ${questName}, Description: ${description}, Subject: ${subject}, Difficulty: ${difficulty}, Questions: ${questions}`
      }
    ]
    
    // USE FOR LOCAL FUNCTION TESTING ONLY
    // this.functionPath = 'http://127.0.0.1:5001/knowledgequest-dbc73/us-central1/generateQuestions';
    return this.http.post<any>(this.functionPath, { messages }).pipe(
      map((response) => {
        const rawMessage = response.choices[0].message.content;
        console.log('Raw message inside pipe:', rawMessage);
        const parsed: SubmittedQuestion[] = JSON.parse(rawMessage);
        return parsed;
      }),
      catchError((error) => {
        console.error('Error:', error);
        return of([]);
      })
    );

  }
}
