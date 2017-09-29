import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'create-new-password',
  templateUrl: 'app/create-new-password.html',
  providers: [WorkersService]
})

export class CreateNewPassword {
	errorMessage:any;
	errMessage:any;
	email:any;
	password:any;
	password2:any;
	token:any;
	success:any;
	loader:boolean = false;
	constructor( private auth:Auth, private http:Http, private authHttp:AuthHttp, 
		private workersService:WorkersService, private route:ActivatedRoute, private router:Router){
	}

	signUp(){
		if(this.password.length < 8){
			this.errMessage = 'Password must be at least 8 characters long!';
		}
		else if(this.password != this.password2){
			this.errMessage = 'Password did not matched!';
		}
		else{
			//this.token = this.route.snapshot.params['token'];
			this.loader = true;
			this.workersService.workerSignup(this.email, this.password2)
				.then(data =>{
						setTimeout((router: Router) => {
					        this.router.navigate(["/worker-login"]);
					    }, 100);
					    this.success = "Account has been set up. Go to login page to access bTIPt account."
					    delete this.errorMessage;
					    console.log(this.success);
					    this.loader = false;
					})
				.catch(error=>{
						//if(error._body.message){
							this.errorMessage = JSON.parse(error._body);
							console.log(error);
							console.log(this.errorMessage);
							this.loader = false;
						//}
						/*else{
							this.errorMessage = error.error;
							console.log(error);
							this.loader = false;
						}*/
					});
		}
	}
};
