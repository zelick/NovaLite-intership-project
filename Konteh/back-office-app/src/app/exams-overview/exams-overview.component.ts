import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamClient, GetExamsForOverviewExamResponse, GetExamsForOverviewResponse } from '../api/api-reference';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exams-overview',
  templateUrl: './exams-overview.component.html',
  styleUrls: ['./exams-overview.component.css']
})
export class ExamsOverviewComponent implements OnInit {
  displayedColumns: string[] = [ 'candidate', 'status', 'score', 'startTime'];
  dataSource = new MatTableDataSource<GetExamsForOverviewExamResponse>([]);
  pageSize = 5;
  totalExams = 0;
  currentPage = 0;
  searchText: string = ''; 
  
  constructor(
    private examClient: ExamClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['searchText'] || '';  
      this.currentPage = +params['page'] || 0;       
      this.pageSize = +params['pageSize'] || 5;      

      this.loadExams();
    });
  }

  loadExams(): void {
    this.examClient.getAllExams(this.searchText, this.currentPage, this.pageSize).subscribe((response: GetExamsForOverviewResponse) => {
      this.dataSource.data = response.exams || [];
      this.totalExams = response.length || 0;
    });
  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.updateUrlParams();
    this.loadExams();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateUrlParams();
    this.loadExams();
  }

  updateUrlParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        searchText: this.searchText,
        page: this.currentPage,
        pageSize: this.pageSize
      },
      queryParamsHandling: 'merge'  
    });
  }
}


