import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html'
})
export class FormErrorsComponent {
  @Input() form!: UntypedFormGroup;

  get generalErrors() {
    return this.form.errors?.['general'];
  }
}
