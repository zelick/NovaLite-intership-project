import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerDto, ExamClient, GetExamQuestionDto, GetExamResponse, IGetExamResponse, QuestionType } from '../api/api-reference';

@Component({
  selector: 'app-taking-test',
  templateUrl: './taking-test.component.html',
  styleUrl: './taking-test.component.css'
})
export class TakingTestComponent implements OnInit{
  id : any;
  page: number = 0;
  examQuestions: GetExamResponse[] = [];
  question: GetExamQuestionDto = new GetExamQuestionDto();
  constructor (private route: ActivatedRoute, private client: ExamClient){
  }
  
  loadExam(){
    this.client.getExam(this.id).subscribe(res => {
      this.examQuestions = res;
      this.question = res[0].questionDto!;
    })
  }

  ngOnInit(): void{
    this.route.queryParamMap.subscribe(param => {
      this.id = param.get('id');
    })
    this.loadExam();
  }

  isChecked(answer: AnswerDto){
    return this.examQuestions[this.page].selectedAnswers?.includes(answer, 0)
  }
  onCheckboxChange(answer: AnswerDto) {
    if(this.isChecked(answer)){
      this.examQuestions[this.page].selectedAnswers = this.examQuestions[this.page].selectedAnswers?.filter((a) => a.answerId !== answer.answerId);
      return;
    }
    this.examQuestions[this.page].selectedAnswers?.push(answer)
  }

  onRadioButtonChange(answer: AnswerDto) {
    this.examQuestions[this.page].selectedAnswers = this.examQuestions[this.page].selectedAnswers?.filter((a) => a.answerId === answer.answerId);
    this.examQuestions[this.page].selectedAnswers?.push(answer);
  }

  next() {
    if(this.page < this.examQuestions.length-1 ){
      this.page++;
      this.question = this.examQuestions[this.page].questionDto!;
    }
  }
  previous(){
    if(this.page > 0 ){
      this.page--;
      this.question = this.examQuestions[this.page].questionDto!;
    }
  }
  submit() {
    console.log(this.examQuestions[this.page].selectedAnswers);
  }
}
