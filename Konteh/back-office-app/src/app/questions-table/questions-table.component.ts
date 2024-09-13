import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GetAllQuestionsResponse, IGetAllQuestionsResponse, QuestionCategory, QuestionClient, QuestionType } from '../api/api-reference';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrl: './questions-table.component.css'
})
export class QuestionsTableComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  value = '';
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'type', 'text',  'edit'];

  dataSource: any;
  questionList !: GetAllQuestionsResponse[];
  constructor(private client:QuestionClient){
    this.loadQuestions();
  }

  loadQuestions(){
    this.client.getAll().subscribe(res =>{
    this.questionList = res;
    this.dataSource = new MatTableDataSource<IGetAllQuestionsResponse>(this.questionList);
    this.dataSource.paginator = this.paginator;
    })
  }

  deleteQuestion(id:number){
    this.client.delete(id).subscribe(res => {
      this.loadQuestions();
    })
  }
  editQuestion(name: string){
    alert(name)
  }

   writeQuestionCategory(val: QuestionCategory): string {
    switch(val) {
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
  writeQuestionType(val: QuestionType){
    if(val === QuestionType.RadioButton)
      return "Radio button"
    else
      return "Checkbox"
  }
  search(data: Event){
    const value = (data.target as HTMLInputElement).value;

    if(value === '')
      this.loadQuestions();
    
    this.client.search(value, this.paginator.pageIndex, this.paginator.pageSize).subscribe(res => {
      this.questionList = res;
      this.dataSource = new MatTableDataSource<IGetAllQuestionsResponse>(this.questionList);
      this.dataSource.paginator = this.paginator;
    })

  }

  handlePageEvent(e: PageEvent) {
    // if(this.value!=='')
    //   return;
     this.client.getAllPaged(e.pageIndex+1, e.pageSize).subscribe(res => {
      this.questionList = res;
      this.dataSource = new MatTableDataSource<IGetAllQuestionsResponse>(this.questionList);
     // this.dataSource.paginator = this.paginator;
    })
  }
}

