import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css'
})
export class QuestionFormComponent implements OnInit{

  isAnswerFormVisible: boolean =  false;
  //answers: { text: string, isCorrect: boolean }[] = []; //need model for Answer
  newAnswerText: string = '';
  newAnswerIsCorrect: boolean = false;

  ngOnInit(): void {
    
  }

  addAnswer(){
    this.isAnswerFormVisible = true;
  }

  createAnswer(){
    this.isAnswerFormVisible = false;
  }

}
