import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { MatIconRegistry, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  
  constructor(private fb: FormBuilder, private db: AngularFireDatabase, public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.formQuery = this.fb.group({
      name: ['', Validators.required, Validators.minLength(2)],
      email: ['', Validators.email],
      message: ['', Validators.required],
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

  }

  afterSubmission() {
    let dialogRef = this.dialog.open(ContactDialog, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //location.reload();
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    
  }

}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: '../contact-dialog/contact-dialog.component.html',
})

export class ContactDialog {

  constructor(
    public dialogRef: MatDialogRef<ContactDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    //location.reload();
    this.dialogRef.close();
  }

}
