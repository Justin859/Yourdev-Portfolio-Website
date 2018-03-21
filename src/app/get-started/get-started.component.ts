import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { MatIconRegistry } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { MatSnackBar } from '@angular/material';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})

export class GetStartedComponent implements OnInit {

  formGroup: FormGroup;

  steps = [
    {label: 'Your name and email address', content: 'Last Name, First Name.'},
    {label: 'Company Details', content: 'Company Name, Physical Address, Company Description.'},
    {label: 'website', content: 'Registered Domain, Website Type, Company Description.'}
  ]

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray');}

  constructor(
     private titleService: Title,
     private fb: FormBuilder,
     private db: AngularFireDatabase,
     private messageService: MessageService,
     public snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          firstNameFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(255)])],
          lastNameFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(255)])],
          emailAddressFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(255)])]
        }),
        this.fb.group({
          companyNameFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(255)])],
          physicalAddressFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(550)])],
          companyDescriptionFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(1001)])]
        }),
        this.fb.group({
          hasDomainFormCtrl: false,
          websiteTypeFormCtrl: ['standardWebsite', Validators.required],
          websiteDescriptionFormCtrl: ['', Validators.compose([Validators.minLength(2), Validators.required, Validators.maxLength(1001)])],
          recaptchaReactiveFormCtrl: ['', Validators.required]
        })
      ])
    })
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  resolved(captchaResponse: string) {
    this.formGroup.get('formArray')['controls'][2]['controls']['recaptchaReactiveFormCtrl'].setErrors(null);
  }

  onSubmission() {
    const {firstNameFormCtrl, lastNameFormCtrl, emailAddressFormCtrl} = this.formArray.value[0];
    const {companyNameFormCtrl, physicalAddressFormCtrl, companyDescriptionFormCtrl} = this.formArray.value[1];
    const {hasDomainFormCtrl, websiteTypeFormCtrl, websiteDescriptionFormCtrl, recaptchaReactiveFormCtrl} = this.formArray.value[2];
    const date = Date();
    const html = `
    
    <div><b>From: </b>${emailAddressFormCtrl}, sent @ ${date}</div><br />
    <div><b>Name: </b>${firstNameFormCtrl} ${lastNameFormCtrl}</div>
    <div><b>Company: </b>${companyNameFormCtrl}</div><br />
    <div><b>Physical Address:</b></div>
    <p>${physicalAddressFormCtrl}</p>
    <div><b>Company Description:</b></div>
    <p>${companyDescriptionFormCtrl}</p>
    <div><b>Register Domain: </b>${hasDomainFormCtrl}</div>
    <div><b>Website Type</b>${websiteTypeFormCtrl}</div>
    <div><b>Website Description:</b></div>
    <p>${websiteDescriptionFormCtrl}</p>
    `;

    let formRequest = {date, firstNameFormCtrl, lastNameFormCtrl, emailAddressFormCtrl, html,
        companyNameFormCtrl, physicalAddressFormCtrl, companyDescriptionFormCtrl,
        hasDomainFormCtrl, websiteTypeFormCtrl, websiteDescriptionFormCtrl, recaptchaReactiveFormCtrl}

    this.db.list('/forms').push(formRequest);
    this.formGroup.reset();

    this.messageService.add(`Thank you, ${firstNameFormCtrl}! Your form has been submitted. We'll will be in touch as soon as possible.`);
    if (this.messageService.messages.length) {

      this.snackBar.open(this.messageService.messages[0], "OK").afterDismissed().subscribe(() => {
        this.messageService.clear();
      });
    }
  }

  ngOnInit() {
    this.setTitle("Yourdev | Get Started");
  }

}
