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
  	let path = window.location.host;
	let parts = path.split('.');
	let sub_domain = parts[0];
	if(sub_domain=='admin'){
  	this.workersService.forgotPassAdmin(this.email)
			.then(data => {
				this.success= 'We have sent you an email. Please check your inbox to reset your password';
			})
			.catch(error => {
				this.errorMessage = JSON.parse(error._body);
			});
	}else{
		this.errorMessage = {message: "You are not authorized to use this resource."};
	}

  }

};
