import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { QuestionsTableComponent } from './questions-table/questions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MsalModule,
  MsalRedirectComponent,
  MsalInterceptor,
} from "@azure/msal-angular";
import {
  InteractionType,
  PublicClientApplication,
} from "@azure/msal-browser";
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsTableComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.msalConfig.clientId,
          authority: environment.msalConfig.authority,
          redirectUri: environment.msalConfig.redirectUri,
        },
        cache: {
          cacheLocation: "localStorage",
          storeAuthStateInCookie: false,
        },
      }),
      null!,
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          
          ["https://localhost:7221/", ['api://dbf7f51e-d046-435b-88ee-c4f9ee872967/to-do-lists.read',
            'api://dbf7f51e-d046-435b-88ee-c4f9ee872967/to-do-lists.write']],
        ]),
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
