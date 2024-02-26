import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-98cf7","appId":"1:478731653791:web:05307be758d79fc330c8aa","storageBucket":"simple-crm-98cf7.appspot.com","apiKey":"AIzaSyAXejCgRKC6iOZPMd_ooQnAabxmdAXhLOs","authDomain":"simple-crm-98cf7.firebaseapp.com","messagingSenderId":"478731653791"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
