import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'guest-reset-password',
  templateUrl: 'app/guest-reset-password.html',
  providers: [WorkersService]
})

export class GuestResetPassword {
	errorMessage:any;
	password:any;
	password2:any;
	token:any;
	success:any;
	constructor( private auth:Auth, private http:Http, private authHttp:AuthHttp, 
		private workersService:WorkersService, private route:ActivatedRoute, private router:Router){
	}

	createPassword(){
		if(this.password != this.password2){
			this.errorMessage = 'Password did not matched!';
		}
		else{
			this.token = this.route.snapshot.params['token'];
			this.workersService.resetPassGuest(this.token, this.password2)
				.then(data =>{
						this.success = "Password has been reset. You can now login to bTIPt app with the new password.";
					})
				.catch(error=>{
						if(error._body.message){
							this.errorMessage = error._body.message;
							//	console.log(this.errorMessage);
						}
						else{
							this.errorMessage = "Invaild Request. Please contact adminstrator, if you are lost.";
						}
					});
		}
	}
};
