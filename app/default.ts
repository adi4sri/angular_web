import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';


@Component({
  selector: 'default',
  templateUrl: 'app/default.html',
  providers: [Auth]
})

export class DefaultComponent {
 email: string;
 password:string;
 user:any = JSON.parse(localStorage.getItem('admin'));
 constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private router:Router){
 	if(this.auth.authenticated()){
 		if(this.user && this.user.user_type == 'admin'){
 		this.router.navigate(['/hotels']);
	 	}else if(this.user &&  this.user.user_type == 'worker'){
	 		this.router.navigate(['/home']);
	 	}
	}

	else if(!this.auth.authenticated()){
		var full = window.location.host;
		var parts = full.split('.');
		var sub_domain = parts[0];
		if(sub_domain == 'admin'){
			this.router.navigate(['/login']);
		}
		else{
			this.router.navigate(['/worker-login']);	
		}
	}
  }
 
};