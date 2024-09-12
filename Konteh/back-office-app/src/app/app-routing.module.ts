import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionFormComponent } from './question-form/question-form.component';

const routes: Routes = [
  {path: 'question-form', component: QuestionFormComponent},
  {path: 'question-form/:id', component: QuestionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
