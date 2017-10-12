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
	loader:boolean = false;
	name:any;
	constructor( 
		private auth:Auth, private http:Http, 
		private authHttp:AuthHttp, private workersService:WorkersService, 
		private route:ActivatedRoute, private router:Router){
	}

	submitBankInfo(){
		this.loader = true;
		this.name=this.f_name + ' ' + this.l_name;

		this.workersService.bankInfo(this.user.id, this.routingNumber, this.accountNumber, this.type, this.name, this.user.hotel_slug)
			.then((data:any)=>{
				console.log(data);
				if(this.auth.authenticated()){
				this.user.default_funding_source = data.body.id;
				localStorage.setItem("admin", JSON.stringify(this.user));
		    	this.workersService.getBankInfo(this.user.id)
		          .then((data1:any)=>{
		              console.log(data1);
		            if((data1['funding-sources'][0] && this.user.login_type=='1' && this.user.user_roles_worker.dashboard == true) || this.user.login_type=='0'){
		                this.router.navigate(["/home"]);
		                console.log('Login',JSON.parse(localStorage.getItem("admin")));
		                setTimeout(function(){
		                  window.location.reload();  
		                },100); 
		              }
		            
		              else if(this.user.user_roles_worker.tip_employee == true && this.user.login_type=='1' && data1['funding-sources'][0]){
		                this.router.navigate(["/employee_tips"]);
		                 setTimeout(function(){
		                  window.location.reload();  
		                },100);
		              }
		              else if(this.user.user_roles_worker.tip_comparison == true && this.user.login_type=='1' && data1['funding-sources'][0]){
		                this.router.navigate(["/tip_comparison"]);
		                 setTimeout(function(){
		                  window.location.reload();  
		                },100);
		              }
		            
		              else if(!data1['funding-sources'][0]){
		                this.router.navigate(["/bank-info"]);
		                 setTimeout(function(){
		                  window.location.reload();  
		                },100); 
		              }
		              else{
		               this.router.navigate(["/settings"]);
		                 setTimeout(function(){
		                  window.location.reload();  
		                },100);  
		              }
		              //setTimeout(function(){ window.location.reload(); }, 100);
		              this.loader = false;
		            })
		          .catch(error =>{
		              console.log(error);
		              //  window.location.reload();    
		              this.loader = false;
		            });
		    	}
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
