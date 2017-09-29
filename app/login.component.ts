import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';


@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  providers: [Auth]
})

export class LoginComponent {
 email: string;
 password:string;
 errorMessage:any;
 constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp, private router:Router){
  if(auth.authenticated()){
    this.router.navigate(['/hotels'])
  }
 }
 loginUser(){
	this.auth.login(this.email,this.password,'admin')
      .then((data:any) => {
        console.log(data);
        data.user_type = 'admin';
        localStorage.setItem("admin", JSON.stringify(data));
        localStorage.setItem("user_roles1", JSON.stringify(data.user_roles_super));
        localStorage.setItem("user_roles2", JSON.stringify(data.user_roles_admin));
        if(data.login_type=='1' && data.user_roles_admin.location == true){
          this.router.navigate(["/hotels"]);
          setTimeout(function(){
                  window.location.reload();  
                },100); 
        }
        else if(data.login_type=='1' && data.user_roles_admin.admin_employees ==true ){
          this.router.navigate(["/admin-workers"]);
          setTimeout(function(){
                  window.location.reload();  
                },100); 
        }
        else if(data.login_type=='1' && data.user_roles_admin.tip_center == true ){
          this.router.navigate(["/tippers"]);
          setTimeout(function(){
                  window.location.reload();  
                },100); 
        }
        else if(data.login_type=='1' && data.user_roles_admin.setting == true ){
          this.router.navigate(["/admin_settings"]);
          setTimeout(function(){
                  window.location.reload();  
                },100); 
        }
        else{
          this.router.navigate(["/hotels"]);
          setTimeout(function(){
                  window.location.reload();  
                },100); 
        }
        })
        .catch(error=>{
          this.errorMessage = JSON.parse(error._body);
        }); // end post
  }
  
  forgotPassword(){
    this.router.navigate(["/admin-forgot-password"]);
  }
};