import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { catchError, map, Observable, of } from 'rxjs';
import { SubmittedQuestion } from '../models/question.model';
import { systemText } from '../../enums/consts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private functionPath: string = 'https://us-central1-knowledgequest-dbc73.cloudfunctions.net/generateQuestions';

  constructor(private http: HttpClient, private authService: AuthService) { }

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
    ];

    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(async (user) => {
        const userobj: User = user!;
        if (!userobj) {
          console.error('User not authenticated');
        }
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${await userobj.getIdToken()}`,
          'Content-Type': 'application/json'
        });

        // USE FOR LOCAL FUNCTION TESTING ONLY
        this.functionPath = 'http://127.0.0.1:5001/knowledgequest-dbc73/us-central1/generateQuestions';
        const observable = this.http.post<any>(this.functionPath, { messages }, { headers }).pipe(
          map((response) => {
            const rawMessage = response.choices[0].message.content;
            const parsed: SubmittedQuestion[] = JSON.parse(rawMessage);
            return parsed;
          }),
          catchError((error) => {
            return of(error);
          })
        );
        resolve(observable);
      });
    });
  }
}
