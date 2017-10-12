import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { Router } from "@angular/router";
import { WorkersService } from './providers/workers.service';
import 'rxjs/add/operator/map';


@Component({
  selector: 'worker-login',
  templateUrl: 'app/worker-login.component.html',
  providers: [Auth]
})

export class WorkerLoginComponent {
 email: string;
 password:string;
 errorMessage:any;
 user = JSON.parse(localStorage.getItem('admin'));
 user_role = JSON.parse(localStorage.getItem('user_roles2'));
 loader:boolean = false;
 constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private router:Router, private workersService: WorkersService){
  /*if(auth.authenticated()){
    if(this.user.login_type=='0'){
        this.router.navigate(["/home"]);
      }
     else if (this.user.login_type=='1'){
       this.router.navigate(["/settings"]);
     }
    }   */
    if(auth.authenticated()){
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
             /* else if(this.user.user_roles_worker.worker_employees == true && this.user.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/workers"]);
                window.location.reload();  
              }*/
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
              /*else if(this.user.user_roles_worker.reviews == true && this.user.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/feedback"]);
                window.location.reload();  
              }*/
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
  }
  
 loginUser(){
  this.loader = true;
  let path = window.location.host;
  let parts = path.split('.');
  let sub_domain = parts[0];
	this.auth.workerLogin(this.email,this.password, 'worker', sub_domain)
      .then((data:any) => {
        console.log('UserData',data);
        data.user_type='worker';
        localStorage.setItem("admin", JSON.stringify(data));
        localStorage.setItem("user_roles1", JSON.stringify(data.user_roles_manager));
        localStorage.setItem("user_roles2", JSON.stringify(data.user_roles_worker));
        this.workersService.getBankInfo(data.id)
          .then((data1:any)=>{
              console.log(data1);
              if((data1['funding-sources'][0] && data.login_type=='1' && data.user_roles_worker.dashboard == true) || data.login_type=='0'){
                this.router.navigate(["/home"]);
                console.log('Login',JSON.parse(localStorage.getItem("admin")));
                 setTimeout(function(){
                  window.location.reload();  
                },100); 
              }
             /* else if(data.user_roles_worker.worker_employees == true && data.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/workers"]);
                window.location.reload();  
              }*/
              else if(data.user_roles_worker.tip_employee == true && data.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/employee_tips"]);
                 setTimeout(function(){
                  window.location.reload();  
                },100); 
              }
              else if(data.user_roles_worker.tip_comparison == true && data.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/tip_comparison"]);
                 setTimeout(function(){
                  window.location.reload();  
                },100); 
              }
              /*else if(data.user_roles_worker.reviews == true && data.login_type=='1' && data1['funding-sources'][0]){
                this.router.navigate(["/feedback"]);
                window.location.reload();  
              }*/
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
        })
        .catch(error=>{
          this.errorMessage = JSON.parse(error._body);
          console.log('LOG', this.errorMessage.message);
          this.loader = false;
          //window.location.reload();  

        }); // end post
  }

  forgotPassword(){
    this.router.navigate(["/forgot-password"]);
  }
};