import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateInfoFormComponent } from './start-info/candidate-info-form.component';
import { TakingTestComponent } from './taking-test/taking-test.component'

const routes: Routes = [
  {
    path:'',
    component: CandidateInfoFormComponent
  },
  {
    path:'test',
    component: TakingTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
