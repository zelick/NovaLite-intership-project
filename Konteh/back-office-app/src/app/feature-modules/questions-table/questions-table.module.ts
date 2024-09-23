import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { QuestionsTableComponent } from './questions-table/questions-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [QuestionsTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatPaginator,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatButtonModule
  ],
  exports:
  [
    QuestionsTableComponent
  ]
})
export class QuestionsTableModule { }
