import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from "@azure/msal-browser";
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { QuestionsTableComponent } from './features/questions/questions-table/questions-table.component';
import { ExamsOverviewComponent } from './features/exams/exams-overview/exams-overview.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  { 
    path: 'questions', 
    canActivate: [authGuard],
    loadChildren: () => import('./features/questions/questions.module').then(m=>m.QuestionsModule)
  },
  {
    path: 'exams',
    component: ExamsOverviewComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/exams/exams.module').then(m=> m.ExamsModule)
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
