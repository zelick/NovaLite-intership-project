import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamClient, GenerateExamCommand, GenerateExamResponse, ExamQuestionDto } from '../api/api-reference'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-info-form',
  templateUrl: './candidate-info-form.component.html',
  styleUrls: ['./candidate-info-form.component.css']
})
export class CandidateInfoFormComponent {
  //examForm: FormGroup;
  examQuestions: ExamQuestionDto[] = []; 
  error : boolean = false;
  examForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') 
    ]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
  });
  constructor(private examClient: ExamClient, private router: Router) {
  }

  onSubmit() {
    if(!this.examForm.valid)
      return;
    
    const formValue = this.examForm.value;
      const query = new GenerateExamCommand({
        email: formValue.email!,
        name: formValue.name!,
        surname: formValue.surname!
      });
            console.log(query);
    this.examClient.createExam(query).subscribe({
      next:(res) => {
        this.router.navigate(['test', res.id]);
      },
      error:() => {
        this.error = true;
      }
    })
  }
}
