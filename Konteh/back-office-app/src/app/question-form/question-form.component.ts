// import { Component} from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'
// import { CreateQuestionAnswerRequest, CreateQuestionCommand, CreateQuestionQuestionRequest, QuestionClient } from '../api/api-reference';



// @Component({
//   selector: 'app-question-form',
//   templateUrl: './question-form.component.html',
//   styleUrl: './question-form.component.css'
// })
// export class QuestionFormComponent{

//   questionForm: FormGroup;

//   constructor(
//     private questionClient: QuestionClient,
//     private formBuilder: FormBuilder
//   ) {
//     this.questionForm = this.formBuilder.group({
//       type: ['', Validators.required],          
//       category: ['', Validators.required],      
//       text: ['', Validators.required],          
//       answers: this.formBuilder.array([]) ,
//       answerText: '',  
//       isCorrect: false 
//     });
//   }

//   createAnswer(){
//     const newAnswer = new CreateQuestionAnswerRequest({
//       text: this.questionForm.get('answerText')?.value,
//       isCorrect: this.questionForm.get('isCorrect')?.value
//     });
    
//     this.answersArray.push(
//       this.formBuilder.group({
//         text: [newAnswer.text],
//         isCorrect: [newAnswer.isCorrect]
//       })
//     );
//     this.clearFormValues()
//   }

//   get answersArray(): FormArray {
//     return this.questionForm.get('answers') as FormArray;
//   }

//   deleteAnswer(index: number){
//     this.questionForm.patchValue({
//       isCorrect: false,
//       answerText: ''
//     });
//   }

//   clearFormValues(){
//     this.questionForm.patchValue({
//       isCorrect: false,
//       answerText: ''
//     });
//   }

//   onCreateQuestion() {
//     const questionData = new CreateQuestionQuestionRequest({
//       text: this.questionForm.get('text')?.value,
//       type: this.questionForm.get('type')?.value,
//       category: this.questionForm.get('category')?.value,
//       answers: this.answersArray.value
//     });

//     const createQuestionCommand = new CreateQuestionCommand({
//       question: questionData
//     });

//     // Log the request data to the console
//     console.log('Data sent to backend:', createQuestionCommand);

//     this.questionClient.create(createQuestionCommand).subscribe(response => {
//       // success message
//       console.log("USAO JE ")
//       alert("USPEHHHHHHHHHHHHH");
//     }, error => {
//       //  error message
//     });
//   }

// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CreateQuestionAnswerRequest, CreateQuestionCommand, QuestionCategory, QuestionClient, QuestionType } from '../api/api-reference';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {
  questionForm: FormGroup;

  constructor(
    private questionClient: QuestionClient,
    private formBuilder: FormBuilder
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

  // Create a new FormGroup for an answer
  createAnswerGroup(answer: CreateQuestionAnswerRequest): FormGroup {
    return this.formBuilder.group({
      text: [answer.text],
      isCorrect: [answer.isCorrect]
    });
  }

  // Add a new answer to the FormArray
  createAnswer() {
    const newAnswer = new CreateQuestionAnswerRequest({
      text: this.questionForm.get('answerText')?.value,
      isCorrect: this.questionForm.get('isCorrect')?.value
    });

    this.answersArray.push(this.createAnswerGroup(newAnswer));
    this.clearFormValues();
  }

  get answersArray(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  deleteAnswer(index: number) {
    this.answersArray.removeAt(index);
  }

  clearFormValues() {
    this.questionForm.patchValue({
      isCorrect: false,
      answerText: ''
    });
  }

  // Convert FormArray values to CreateQuestionAnswerRequest instances
  getAnswers(): CreateQuestionAnswerRequest[] {
    return this.answersArray.controls.map(control => 
      new CreateQuestionAnswerRequest(control.value)
    );
  }

  onCreateQuestion() {

    const createQuestionCommand = new CreateQuestionCommand({
      text: this.questionForm.get('text')?.value,
      type: this.questionForm.get('type')?.value,
      category: this.questionForm.get('category')?.value,
      answers: this.getAnswers() // Convert form values to CreateQuestionAnswerRequest
    });

    // Log the request data to the console
    console.log('Data sent to backend:', createQuestionCommand);

    this.questionClient.create(createQuestionCommand).subscribe(response => {
      // success message
      console.log("USAO JE ");
      alert("USPEHHHHHHHHHHHHH");
    }, error => {
      // error message
      console.error('Error:', error);
    });
  }
}
