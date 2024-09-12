import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsOverviewComponent } from './questions-overview/questions-overview.component';

const routes: Routes = [
  {path: 'questions', component: QuestionsOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
