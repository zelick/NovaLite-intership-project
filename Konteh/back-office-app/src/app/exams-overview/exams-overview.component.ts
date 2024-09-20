import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamClient, GetAllQuestionsResponse, GetExamsForOverviewExamResponse, GetExamsForOverviewResponse } from '../api/api-reference';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-exams-overview',
  templateUrl: './exams-overview.component.html',
  styleUrls: ['./exams-overview.component.css'] 
})
export class ExamsOverviewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'candidate', 'totalQuestions'];
  dataSource = new MatTableDataSource<GetExamsForOverviewExamResponse>([]);
  pageSize = 5;
  totalExams = 0; 
  currentPage = 0;
  examsList!: GetAllQuestionsResponse[];

  constructor(private examClient: ExamClient) {}

  ngOnInit(): void {
    this.loadExams(0, this.pageSize);
  }

  loadExams(page: number, pageSize: number){
    this.examClient.getAllExams(page, pageSize).subscribe(response => {
      console.log(response)
      this.dataSource.data = response.exams || [];
      
    }, error => {
      console.error('Error loading exams: ', error);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadExams(this.currentPage, this.pageSize);
  }
}
