import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'bank-info',
  templateUrl: 'app/bank-info.html',
  providers: [WorkersService]
})

export class BankInfo {
	user = JSON.parse(localStorage.getItem('admin'));
	success:any;
	errorMessage:any;
	errors:any;
	f_name:any;
	l_name:any;
	type:any;
	routingNumber:any;
	accountNumber:any;

	constructor( 
		private auth:Auth, private http:Http, 
		private authHttp:AuthHttp, private workersService:WorkersService, 
		private route:ActivatedRoute, private router:Router){
	}

	submitBankInfo(){
		let name=this.f_name + ' ' + this.l_name;
		this.workersService.bankInfo(this.user.id, this.routingNumber, this.accountNumber, this.type, name)
			.then(data=>{
				console.log(data);
				this.router.navigate(['/home']);
				setTimeout(function(){ window.location.reload(); }, 100);
				})
			.catch(error=>{
				this.errorMessage = JSON.parse(error._body);
				this.errorMessage = (JSON.parse(this.errorMessage.message));
				console.log(this.errorMessage);
				if(this.errorMessage._embedded.errors){
					this.errors = this.errorMessage._embedded.errors;
				}
				});
	}
};
