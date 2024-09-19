import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamClient, GenerateExamCommand, GenerateExamResponse, ExamQuestionDto } from '../api/api-reference'; 

@Component({
  selector: 'app-candidate-info-form',
  templateUrl: './candidate-info-form.component.html',
  styleUrls: ['./candidate-info-form.component.css']
})
export class CandidateInfoFormComponent {
  examForm: FormGroup;
  examQuestions: ExamQuestionDto[] = []; 

  constructor(private fb: FormBuilder, private examClient: ExamClient) {
    this.examForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') 
      ]],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const formValue = this.examForm.value;
      const query = new GenerateExamCommand({
        email: formValue.email,
        name: formValue.name,
        surname: formValue.surname
      });

      this.examClient.createExam(query).subscribe({
        next: (response: GenerateExamResponse) => {
          this.examQuestions = response.examQuestions || [];
        },
        error: (err) => {
          
        }
      });
    }
  }
}
