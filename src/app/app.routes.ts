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

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Redirect root path to /dashboard
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'question-bank', component: QuestionBankComponent },
    { path: 'quest/add-questions/:id', component: AddQuestionToQuestComponent },
    { path: 'quest/preview/:id', component: PreviewQuestComponent },
    { path: 'quest/start/:id', component: QuestStartComponent },
    { path: 'quest/play/:id', component: QuestPlayerComponent }
];
