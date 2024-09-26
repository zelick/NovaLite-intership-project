import { Component, OnInit } from '@angular/core';
import { GetQuestionCategoryStatisticResponse, QuestionClient } from '../../../api/api-reference';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-category-statistics',
  templateUrl: './question-category-statistics.component.html',
  styleUrl: './question-category-statistics.component.css'
})
export class QuestionCategoryStatisticsComponent implements OnInit{

  chartCategoryOptions: any;
    
  constructor(
    private questionClient: QuestionClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chartCategoryOptions = {
      animationEnabled: true,
      theme: "light",
      exportEnabled: true,
      title: {
        text: "Questions statistics by category"
      },
      subtitles: [{
        text: "Candidates answered correctly"
      }],
      data: [{
        type: "column",
        indexLabel: "{label}: {y}%",
        dataPoints: [] 
      }]
    }
    this.getQuestionCategoryStatistics();
  }

  getQuestionCategoryStatistics(){

    this.questionClient.getCategoryQuestionStatistic().subscribe({
      next: (response: GetQuestionCategoryStatisticResponse[]) => {
         
        response.forEach((element) => {
          var dataPointElement = { label: element.categoryName, y: element.correctPercentage}
          this.chartCategoryOptions.data[0].dataPoints.push(dataPointElement);
        });
        this.chartCategoryOptions = { ...this.chartCategoryOptions };
        this.chartCategoryOptions.render(); 
      },
      error: (error) => {}
    });   
  }

  


}
