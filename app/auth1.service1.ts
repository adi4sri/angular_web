import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {

  private options = {
    theme: {
      logo: 'http://13.59.184.105:9000/logo',
      primaryColor: '#85BB65'
    },
    languageDictionary: {    
      title: ""
    },
    initialScreen: 'signUp'
    
  };

  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, this.options);

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {      
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('auth_id', authResult.idTokenPayload.sub.substring(6));
    });
  }

  public login() {
    // Call the show method to display the widget.
    //this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    //return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    //localStorage.removeItem('id_token');
  };
};
