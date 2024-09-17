import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ISearchQuestionsResponse, QuestionCategory, QuestionClient, QuestionType, SearchQuestionsQuery, SearchQuestionsResponse } from '../api/api-reference';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrl: './questions-table.component.css'
})
export class QuestionsTableComponent{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl('');
  pageIndex : number = 0;
  pageSize : number = 0;
  length : number = 0;
  displayedColumns = ['category', 'type', 'text', 'edit'];

  dataSource: any;
  questionList !: SearchQuestionsResponse[];

  constructor(private client: QuestionClient) {
    this.pageSize = 5;
    this.search(0);
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.search(0);
      })
  }

  deleteQuestion(id: number) {
    this.client.delete(id).subscribe(res => {
      this.search(this.pageIndex);
    })
  }
  editQuestion(id: number) {
    alert(id)
  }

  getQuestionCategoryName(val: QuestionCategory): string {
    switch (val) {
      case QuestionCategory.Http:
        return "Http";
      case QuestionCategory.CSharp:
        return "C#";
      case QuestionCategory.Git:
        return "Git";
      case QuestionCategory.Oop:
        return "Oop";
      default:
        return "SQL";
    }
  }
  getQuestionTypeName (val: QuestionType) {
    if (val === QuestionType.RadioButton)
      return "Radio button"
    else
      return "Checkbox"
  }

  search(page:number){
    let query = new SearchQuestionsQuery({
      text: this.searchControl.value ?? undefined,
      page: page,
      pageSize: this.pageSize
    });        
    this.client.search(query).subscribe(res => {
      this.questionList = res.questions === undefined ? [] : res.questions;
      this.length = res.length === undefined ? 0 : res.length;
      this.pageIndex = page;
      this.dataSource = new MatTableDataSource<ISearchQuestionsResponse>(this.questionList);
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.search(e.pageIndex);
  }
}

