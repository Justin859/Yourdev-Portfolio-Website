// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    // Initialize Firebase
    apiKey: "AIzaSyCL7hT77-BeJWMxyLdDHUEnhXA71cAQsqQ",
    authDomain: "yourdev-portfolio.firebaseapp.com",
    databaseURL: "https://yourdev-portfolio.firebaseio.com",
    projectId: "yourdev-portfolio",
    storageBucket: "yourdev-portfolio.appspot.com",
    messagingSenderId: "907832587237"
  }
};
