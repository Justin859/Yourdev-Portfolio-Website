'use strict';

const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const AWS = require('aws-sdk');
const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  endpoint: 'https://email.us-east-1.amazonaws.com',
  accessKeyId: functions.config().aws.key,
  "secretAccessKey": functions.config().aws.secret,
  "region": "us-east-1",
});

var emailResponse = '';

exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite((event) => {
  const snapshot = event.data;
  const val = snapshot.val();
  // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().date) {
      return null;
    }

    const emailParams = {
      Destination: { ToAddresses: [ 'EcmaStack <justin@yourdev.co.za>' ] },
      Message: {
        Body: { Html: {
          Data: `${val.html}`,
          Charset: 'UTF-8' } },
        Subject: { Data: 'Contact Form', Charset: 'UTF-8' }
      },
      ReplyToAddresses: [val.email],
      Source: `${val.name} <query@yourdev.co.za>`, // this has to be verified email in SES
      };

    ses.sendEmail(emailParams, (error, data) => {
      if (error) {
         // handle error
         emailResponse = error;
      } else {
         emailResponse = data;
         // handle success
      }
    })
    return emailResponse;
});

exports.sendClientform = functions.database.ref('/forms/{pushKey}').onWrite((event) => {
  const snapshot = event.data;
  const val = snapshot.val();
  // Only send email for new messages.
    if (snapshot.previous.val() || !snapshot.val().date) {
      return null;
    }

    const emailParams = {
      Destination: { ToAddresses: [ 'EcmaStack <justin@yourdev.co.za>' ] },
      Message: {
        Body: { Html: {
          Data: `${val.html}`,
          Charset: 'UTF-8' } },
        Subject: { Data: 'Client Form', Charset: 'UTF-8' }
      },
      ReplyToAddresses: [val.emailAddressFormCtrl],
      Source: `${val.firstNameFormCtrl} ${val.lastNameFormCtrl} <query@yourdev.co.za>`, // this has to be verified email in SES
      };

    ses.sendEmail(emailParams, (error, data) => {
      if (error) {
         // handle error
         emailResponse = error;
      } else {
         emailResponse = data;
         // handle success
      }
    })
    return emailResponse;
});