import { Component } from '@angular/core';

import { Http }      from '@angular/http';

import { WorkersService } from './providers/workers.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'admin-forgot-password',
  templateUrl: 'app/admin-forgot-password.html',
  providers: [WorkersService]
})

export class AdminForgotPassword {
	email:any;
	success:any;
	errorMessage:any;
  constructor(private workersService: WorkersService, private http: Http) {

  }

  forgot(){
  	this.workersService.forgotPassAdmin(this.email)
			.then(data => {
				this.success= 'We have sent you an email. Please check your inbox to reset your password';
			})
			.catch(error => {
				this.errorMessage = JSON.parse(error._body);
			});
  }

};
