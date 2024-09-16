import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamClient, GenerateExamQuery, GenerateExamResponse, ExamQuestion } from '../api/api-reference'; 

@Component({
  selector: 'app-start-info',
  templateUrl: './start-info.component.html',
  styleUrls: ['./start-info.component.css'] // Fixed typo: should be styleUrls
})
export class StartInfoComponent {
  examForm: FormGroup;
  examQuestions: ExamQuestion[] = []; // Use the correct type

  constructor(private fb: FormBuilder, private examClient: ExamClient) {
    this.examForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const formValue = this.examForm.value;
      const query = GenerateExamQuery.fromJS({
        email: formValue.email,
        name: formValue.name,
        surname: formValue.surname
      });

      this.examClient.createExam(query).subscribe({
        next: (response: GenerateExamResponse) => {
          this.examQuestions = response.examQuestions || []; // Ensure correct type
          
        },
        error: (err) => {
          
        }
      });
    }
  }
}
