import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerDto, ExamClient, GetExamQuestionDto, GetExamResponse, IGetExamResponse, QuestionType, SubmitExamCommand } from '../api/api-reference';

@Component({
  selector: 'app-taking-test',
  templateUrl: './taking-test.component.html',
  styleUrl: './taking-test.component.css'
})
export class TakingTestComponent implements OnInit{
  id : number = 0;
  page: number = 0;
  examQuestions: GetExamResponse[] = [];
  question: GetExamQuestionDto = new GetExamQuestionDto();
  constructor (private route: ActivatedRoute, private examClient: ExamClient, private router:Router){
  }
  
  loadExam(){
    this.examClient.getExam(this.id).subscribe({
      next:(res) =>{
        this.examQuestions = res;
        this.question = res[0].questionDto!;
      },
      error:()=>{
          this.router.navigate([""]);
      }
    })
  }

  ngOnInit(): void{
    this.route.queryParamMap.subscribe(param => {
      this.id = Number(param.get('id'))
      //this.id = param.get('id')!==null ? Number(param.get('id')) : 0;
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
    var request = new SubmitExamCommand({id : this.id, examQuestions: this.examQuestions});
    this.examClient.submit(request).subscribe(res => {
      this.router.navigate([""])
    })
  }
}
