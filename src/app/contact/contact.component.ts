import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { MatIconRegistry } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { MatSnackBar } from '@angular/material';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  formQuery: FormGroup;

  name_value = '';
  email_value = '';
  query_value = '';
  recaptchaReactive = '';
  
  constructor(
   private fb: FormBuilder,
   private db: AngularFireDatabase,
   private messageService: MessageService,
   public snackBar: MatSnackBar,
   private titleService: Title) {
    this.createForm();
    
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  createForm() {
    this.formQuery = this.fb.group({
      name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      message: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      recaptchaReactive: [null, Validators.required]
    });
    
  }

  onSubmit() {
    const {name, email, message} = this.formQuery.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, message, date, html };

    this.db.list('/messages').push(formRequest);
    this.formQuery.reset();

    this.messageService.add(`Thank you, ${name}! Your message has been sent. We'll will be in touch as soon as possible.`);
    if (this.messageService.messages.length) {

      this.snackBar.open(this.messageService.messages[0], "OK").afterDismissed().subscribe(() => {
        this.messageService.clear();
      });
    }
  }

  resolved(captchaResponse: string) {
    this.formQuery.controls['recaptchaReactive'].setErrors(null);
  }

  ngOnInit() {
    this.setTitle("Yourdev | Contact");
  }

}

