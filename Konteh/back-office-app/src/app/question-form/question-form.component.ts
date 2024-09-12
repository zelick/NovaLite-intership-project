import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CreateQuestionAnswerRequest, CreateQuestionCommand, QuestionCategory, QuestionClient, QuestionType, UpdateQuestionCommand } from '../api/api-reference';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit{

  questionForm: FormGroup;
  questionType = QuestionType;
  questionCategory = QuestionCategory;
  questionId?: number;
  isEditing: boolean = false;
  editIndex?: number;

  constructor(
    private questionClient: QuestionClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.formBuilder.group({
      type: [QuestionType.Checkbox, Validators.required],
      category: [QuestionCategory.Oop, Validators.required],
      text: ['', Validators.required],
      answers: this.formBuilder.array([]),
      answerText: '',
      isCorrect: false
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
      const paramId = param.get('id');
      if(paramId) {
        this.isEditing = true;
        this.questionId = Number(paramId)
        this.loadQuestionData(this.questionId);
      }
    });
  }

  loadQuestionData(id: number){
    this.questionClient.getQuestionById(id).subscribe(question => {
      if(question){
        this.questionForm.patchValue({
          text: question.text,
          type: question.type,
          category: question.category,
          answerText: '',
          isCorrect: false
        });
  
        this.answersArray.clear();
        if(question.answers){
          question.answers.forEach(answer => {
            this.answersArray.push(this.createAnswerGroup(answer));
          });
        }
      }
    });
  }

  createAnswerGroup(answer: CreateQuestionAnswerRequest): FormGroup {
    return this.formBuilder.group({
      text: [answer.text,  Validators.required],
      isCorrect: [answer.isCorrect]
    });
  }

  createAnswer() {
    const newAnswer = new CreateQuestionAnswerRequest({
      text: this.questionForm.get('answerText')?.value,
      isCorrect: this.questionForm.get('isCorrect')?.value
    });
    this.answersArray.push(this.createAnswerGroup(newAnswer));
    this.clearAnswerFormValues();
  }

  onEditAnswerFormClick(){
    const newAnswer = new CreateQuestionAnswerRequest({
      text: this.questionForm.get('answerText')?.value,
      isCorrect: this.questionForm.get('isCorrect')?.value
    });
    
    if (this.isEditing) {
      this.answersArray.at(this.editIndex!).patchValue(newAnswer); 
      this.editIndex = undefined;
      this.clearAnswerFormValues();
    } 
  }

  get answersArray(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  deleteAnswer(index: number) {
    this.answersArray.removeAt(index);
  }

  onEditAnswerCardClick(index: number) {
    const answer = this.answersArray.at(index).value;
    this.questionForm.patchValue({
      answerText: answer.text,
      isCorrect: answer.isCorrect
    });
    this.isEditing = true;
    this.editIndex = index;
  }

  clearAnswerFormValues() {
    this.questionForm.patchValue({
      isCorrect: false,
      answerText: ''
    });
  }

  convertAnswerArray(): CreateQuestionAnswerRequest[] {
    return this.answersArray.controls.map(control => 
      new CreateQuestionAnswerRequest(control.value)
    );
  }

  onCreateQuestion() {
    //Validations
    if (!this.questionForm.valid) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!this.hasMinimumAnswers()) {
      alert("You must provide at least two answers.");
      return;
    }
    if (!this.hasMinimumCorrectAnswers()) {
      alert("For Checkbox type questions, there must be at least two correct answers.");
      return;
    }

    

    if(!this.isEditing){
      const createQuestionCommand = new CreateQuestionCommand({
        text: this.questionForm.get('text')?.value,
        type: this.questionForm.get('type')?.value,
        category: this.questionForm.get('category')?.value,
        answers: this.convertAnswerArray() 
      });

      this.questionClient.create(createQuestionCommand).subscribe(response => {
        alert("You successfully created the question with answers. ");
        
      });
    }else{
      const createQuestionCommand = new UpdateQuestionCommand({
        id: this.questionId,
        text: this.questionForm.get('text')?.value,
        type: this.questionForm.get('type')?.value,
        category: this.questionForm.get('category')?.value,
        answers: this.convertAnswerArray() 
      });
      
      this.questionClient.update(createQuestionCommand).subscribe(response => {
        alert("You successfully updated the question with answers. ");
        
      });
    }
    this.clearForm();
  }

  clearForm() {
    this.questionForm.reset({
      type: QuestionType.Checkbox,  
      category: QuestionCategory.Oop,  
      text: '',  
      answerText: '',  
      isCorrect: false
    });
  
    this.answersArray.clear();
  }

  hasMinimumAnswers(): boolean {
    return this.answersArray.length >= 2;
  }

  hasMinimumCorrectAnswers(): boolean {
    if (this.questionForm.get('type')?.value === QuestionType.Checkbox) {
      const correctAnswers = this.answersArray.controls.filter(answer => answer.get('isCorrect')?.value === true);
      return correctAnswers.length >= 2;
    }
    return true;  
  }
  
}
