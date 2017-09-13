import { Component }         from '@angular/core';
import { Auth }              from './auth.service';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {
  user = JSON.parse(localStorage.getItem('admin')); 
  role = JSON.parse(localStorage.getItem('user_roles2')); 
  view_hotel_mode = JSON.parse(localStorage.getItem('view_hotel')); 
  v_data:any;
  view_mode:any;
  navbar:boolean = false;
  constructor(private auth: Auth, public router:Router) {
   
    console.log('mode',this.view_hotel_mode);
    console.log('user',this.user);
    let current_url = window.location.href;
    var str_sub = current_url.substr(current_url.lastIndexOf("/")+1);
    if(str_sub == 'bank-info'){
      this.navbar = false;
    }
    else{
     this.navbar = true; 
    }
    console.log('nav', str_sub);
  }
  
  logoutUser(){
	this.auth.logout();
	//this.router.navigate(["/login"]);
	this.router.navigate(["/login"]);
  localStorage.clearAll();
 	//window.location.replace('/login');
	}


  view_admin(){
    this.v_data = this.user;
    this.v_data.user_type="admin";
    this.v_data.hotel_id=null;
    localStorage.setItem("admin", JSON.stringify(this.v_data));
    this.view_mode = false;
    localStorage.setItem("view_hotel", JSON.stringify(this.view_mode));
    this.router.navigate(['/hotels']);
    setTimeout(function(){ window.location.reload(); }, 100);
  }
};
