import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsTableComponent } from './feature-modules/questions-table/questions-table/questions-table.component';
import { QuestionFormComponent } from './feature-modules/question-form/question-form/question-form.component';
import { BrowserUtils } from "@azure/msal-browser";
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ExamsOverviewModule } from './feature-modules/exams-overview/exams-overview.module';
import { ExamsOverviewComponent } from './feature-modules/exams-overview/exams-overview/exams-overview.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  { 
    path: 'questions', 
    component: QuestionsTableComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./feature-modules/questions-table/questions-table.module').then(m=>m.QuestionsTableModule)
  },
  {
    path: 'questions/add',
    component: QuestionFormComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./feature-modules/question-form/question-form.module').then(m=>m.QuestionFormModule)
  },
  {
    path: 'questions/:id', 
    component: QuestionFormComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./feature-modules/question-form/question-form.module').then(m=>m.QuestionFormModule)
  },
  {
    path: 'exams',
    component: ExamsOverviewComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./feature-modules/exams-overview/exams-overview.module').then(m=> m.ExamsOverviewModule)
  }
  
];

const isIframe = window !== window.parent && !window.opener;


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
