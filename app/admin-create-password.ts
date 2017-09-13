import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'admin-create-password',
  templateUrl: 'app/admin-create-password.html',
  providers: [WorkersService]
})

export class AdminCreatePassword {
	errorMessage:any;
	password:any;
	password2:any;
	token:any;
	success:any;
	constructor( private auth:Auth, private http:Http, private authHttp:AuthHttp, 
		private workersService:WorkersService, private route:ActivatedRoute, private router:Router){
	}

	createPassword(){
		if(this.password.length < 8){
			this.errorMessage = 'Password must be atleast 8 characters long!';
		}
		else if(this.password != this.password2){
			this.errorMessage = 'Password did not matched!';
		}
		else{
			this.token = this.route.snapshot.params['token'];
			this.workersService.createPassAdmin(this.token, this.password2)
				.then(data =>{
						setTimeout((router: Router) => {
					        this.router.navigate(["/login"]);
					    }, 3000);
						this.success = "Password has been reset. You will be redirected to login page in 3 seconds.";
					})
				.catch(error=>{
					this.errorMessage = JSON.parse(error._body.message);
						console.log(this.errorMessage);
					});
		}
	}
};
