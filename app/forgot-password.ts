import { Component } from '@angular/core';

import { Http }      from '@angular/http';

import { WorkersService } from './providers/workers.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'forgot-password',
  templateUrl: 'app/forgot-password.html',
  providers: [WorkersService]
})

export class ForgotPassword {
	email:any;
	success:any;
	errorMessage:any;
  constructor(private workersService: WorkersService, private http: Http) {

  }

  forgot(){
  	this.workersService.forgotPassword(this.email)
			.then(data => {
				this.success= 'We have sent you an email. Please check your inbox to reset your password';
			})
			.catch(error => {
				this.errorMessage = JSON.parse(error._body);
				console.log(this.errorMessage);
			});
  }

};
