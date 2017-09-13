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
 loader:boolean = false;

 constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private router:Router, private workersService: WorkersService){
  if(auth.authenticated()){
    this.router.navigate(["/home"]);
    }   
  }
  
 loginUser(){
  this.loader = true;
	this.auth.workerLogin(this.email,this.password, 'worker')
      .then((data:any) => {
        console.log('UserData',data);
        data.user_type='worker';
        localStorage.setItem("admin", JSON.stringify(data));
        localStorage.setItem("user_roles1", JSON.stringify(data.user_roles_manager));
        localStorage.setItem("user_roles2", JSON.stringify(data.user_roles_worker));
        this.workersService.getBankInfo(data.id)
          .then((data1:any)=>{
            
              if((data1['funding-sources'][0] && data.login_type=='1') || data.login_type=='0'){
                this.router.navigate(["/home"]);
                console.log('Login',JSON.parse(localStorage.getItem("admin")));
                window.location.reload();  
              }
              else{
                this.router.navigate(["/bank-info"]);
                window.location.reload();  
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