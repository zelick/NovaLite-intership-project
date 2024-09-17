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
  pageSize : number = 5;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'type', 'text', 'edit'];

  dataSource: any;
  questionList !: SearchQuestionsResponse[];

  constructor(private client: QuestionClient) {
    this.loadQuestions();
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        let query = new SearchQuestionsQuery({
          text: value ?? undefined,
          page: this.pageIndex,
          pageSize: this.pageSize
        });        
        this.client.search(query).subscribe(res => {
          this.questionList = res.questions === undefined ? [] : res.questions;
          this.paginator.length = res.length === undefined ? 0 : res.length;
          this.paginator.pageIndex = 0;
          this.dataSource = new MatTableDataSource<ISearchQuestionsResponse>(this.questionList);
        })
      })
  }

  loadQuestions() {
    this.client.getAll().subscribe(res => {
      this.questionList = res;
      this.dataSource = new MatTableDataSource<ISearchQuestionsResponse>(this.questionList);
      this.dataSource.paginator = this.paginator;
      this.paginator.pageIndex = 0;
    })

  }

  deleteQuestion(id: number) {
    this.client.delete(id).subscribe(res => {
      this.loadQuestions();
    })
  }
  editQuestion(name: string) {
    alert(name)
  }

  writeQuestionCategory(val: QuestionCategory): string {
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
  writeQuestionType(val: QuestionType) {
    if (val === QuestionType.RadioButton)
      return "Radio button"
    else
      return "Checkbox"
  }

  handlePageEvent(e: PageEvent) {
    let query = new SearchQuestionsQuery({
      text: this.searchControl.value ?? undefined,
      page: e.pageIndex,
      pageSize: e.pageSize
    });
    this.pageSize = e.pageSize;
    this.client.search(query).subscribe(res => {
      this.questionList = res.questions === undefined ? [] : res.questions;
      this.paginator.length = res.length === undefined ? 0 : res.length;
      this.dataSource = new MatTableDataSource<ISearchQuestionsResponse>(this.questionList);
    })
  }
}

