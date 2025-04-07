import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup/signup.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { AuthGuard } from './auth.guard';
import { AddQuestionToQuestComponent } from './question-bank/add-question-to-quest/add-question-to-quest.component';
import { PreviewQuestComponent } from './preview-quest/preview-quest.component';
import { QuestStartComponent } from './quest-start/quest-start.component';
import { QuestPlayerComponent } from './quest-player/quest-player.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateQuestComponent } from './dashboard/new-quest-dialog/create-quest/create-quest.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'question-bank', component: QuestionBankComponent , canActivate: [AuthGuard] },
    { path: 'quest/add-questions/:id', component: AddQuestionToQuestComponent, canActivate: [AuthGuard]  },
    { path: 'quest/preview/:id', component: PreviewQuestComponent },
    { path: 'quest/start/:id', component: QuestStartComponent },
    { path: 'quest/play/:id', component: QuestPlayerComponent },
    { path: 'quest/create/:id', component: CreateQuestComponent, canActivate: [AuthGuard] },
];
