import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTabsModule,
        MatDividerModule,
        MatCardModule,
        MatSnackBarModule,
        MatGridListModule,
        MatListModule,
        MatFormFieldModule,
        MatStepperModule,
        MatRadioModule,
        MatInputModule,
        MatDialogModule,
        MatSidenavModule} from '@angular/material';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog'        
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { MessageService } from './message.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    data: {
      title: 'Yourdev'
    }
  },

  { path: 'services', component: ServicesComponent,
    data: {
      title: 'Yourdev | Services'
    } 
  },
  {
    path: 'contact/query',
    component: ContactComponent,
    data: {
       title: 'Yourdev | Contact' 
      }
  },
  {
    path: 'contact/get-started',
    component: GetStartedComponent,
    data: {
      title: 'Yourdev | Get Started'
    }
  }

  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ServicesComponent,
    GetStartedComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RecaptchaModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
  entryComponents: [
    
  ],
  providers: [
    AngularFireDatabase,
    MessageService,
    Title
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {

 }
