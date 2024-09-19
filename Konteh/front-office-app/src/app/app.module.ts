import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CandidateInfoFormComponent } from './start-info/candidate-info-form.component';
import { MatInput } from '@angular/material/input';
import { TakingTestComponent } from './taking-test/taking-test.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateInfoFormComponent,
    TakingTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
