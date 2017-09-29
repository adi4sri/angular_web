import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  user = JSON.parse(localStorage.getItem('admin')); 

  constructor(private router:Router, public auth: Auth, private http: Http, private authHttp: AuthHttp){}
  canActivate() {
    if(!this.auth.authenticated()){

    	this.router.navigate(['/default']);
    	//document.write('Please Login to continue');
      var node = document.createElement("div");  
      node.setAttribute('class', 'alert alert-danger alert-dismissable login-alert');
      var text = document.createTextNode('Please Login first to access the content');
      node.appendChild(text);
      document.getElementById('main').appendChild(node);

      var childNode = document.createElement("a");
      childNode.setAttribute('class','close');
      childNode.setAttribute('data-dismiss','alert');
      var linkText = document.createTextNode('x');
      childNode.appendChild(linkText);
      node.insertBefore(childNode,node.firstChild);
  }
  else{
		return true;
	}
  }

  canActivateChild() {
    return true;
  }

  canLoad(){
    if(this.auth.authenticated() && this.user.user_type=='worker'){
      this.router.navigate(['/home']);
      return false;
    }
    if(this.auth.authenticated() && this.user.user_type=='admin'){
      this.router.navigate(['/hotels']);
      return false;
    }
    
    //return true;
  }

};