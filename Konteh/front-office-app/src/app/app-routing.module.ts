import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateInfoFormComponent } from './start-info/candidate-info-form.component';

const routes: Routes = [
  {
    path:'',
    component: CandidateInfoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
