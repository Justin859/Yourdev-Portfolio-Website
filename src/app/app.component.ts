import { Component } from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor() { }

  mobileQuery: MediaQueryList;
  title = 'Yourdev Web Development';

  navLinks = [
    {
      path: '/',
      label: 'HOME',
      title: ''
    },

    { path: 'services',
      label: 'SERVICES',
      title: 'Services'
    },
    {
      path: 'contact/query',
      label: 'CONTACT',
      title: 'Contact'
    }

];

navLinksContact = [
  {
    path: 'contact/query',
    label: 'CONTACT',
    title: 'Contact'
  },
  {
    path: 'contact/get-started',
    label: 'GET_STARTED',
    title: 'Get Started'
  }
]

}
