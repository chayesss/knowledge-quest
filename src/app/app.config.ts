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
      initializeApp({"projectId":"knowledgequest-dbc73",
        "appId":"1:179270612276:web:ceb3a227d39d3bde88a161",
        "databaseURL":"https://knowledgequest-dbc73-default-rtdb.firebaseio.com",
        "storageBucket":"knowledgequest-dbc73.appspot.com",
        "apiKey":"AIzaSyAxq-FTbFrtT0pZS-v8fv8tlKizSwFnBmA",
        "authDomain":"knowledgequest-dbc73.firebaseapp.com",
        "messagingSenderId":"179270612276"})), 
        provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
