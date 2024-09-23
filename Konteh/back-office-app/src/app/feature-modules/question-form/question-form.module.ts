import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from './question-form/question-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorsComponent } from '../../shared/form-errors/form-errors.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [QuestionFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatOptionModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    FormErrorsComponent,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
],
  exports:[
    QuestionFormComponent
  ]

})
export class QuestionFormModule { }
