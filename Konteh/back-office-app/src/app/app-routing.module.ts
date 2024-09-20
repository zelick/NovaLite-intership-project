import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsTableComponent } from './questions-table/questions-table.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { BrowserUtils } from "@azure/msal-browser";
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ExamsOverviewComponent } from './exams-overview/exams-overview.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  { 
    path: 'questions', 
    component: QuestionsTableComponent
  },
  {
    path: 'questions/add',
    component: QuestionFormComponent
  },
  {
    path: 'questions/:id', 
    component: QuestionFormComponent
  },
  {
    path: 'exams',
    component: ExamsOverviewComponent
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
