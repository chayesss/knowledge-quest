import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideFirebaseApp(() =>
    initializeApp({
      "projectId": import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
      "appId": import.meta.env['NG_APP_FIREBASE_APP_ID'],
      "databaseURL": import.meta.env['NG_APP_FIREBASE_DATABASE_URL'],
      "storageBucket": import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
      "apiKey": import.meta.env['NG_APP_FIREBASE_API_KEY'],
      "authDomain": import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
      "messagingSenderId": import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']
    })),
  provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};

