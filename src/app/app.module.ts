import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTabsModule,
        MatDividerModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSidenavModule} from '@angular/material';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog'        
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { ContactDialog } from './contact/contact.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ServicesComponent,
    ContactDialog,
    ContactDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
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
    ContactDialog
  ],
  providers: [
    AngularFireDatabase
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {

 }
