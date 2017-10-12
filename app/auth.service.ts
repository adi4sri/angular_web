import { Injectable }      from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";
import { CanActivate, CanActivateChild } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  url: string = 'http://13.59.184.105:9000/';
  user=localStorage.getItem('admin');
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });
  constructor(public http: Http, private router:Router) {
    // Add callback for lock `authenticated` event
  }

  login(email, password, user_type) {
    return new Promise((resolve,reject) => { 
    var data = {email: email, password: password, user_type:user_type};
    console.log(data);
    let postUrl = this.url + 'users/admin/login';
    
    this.http
    .post(postUrl, data, this.options)
      .map(res => res.json())
      .subscribe(data => {
            this.user=data;
            localStorage.setItem('id_token',data.id);
            localStorage.setItem('auth_id',data.id);
            resolve(data);
      }, error => {
          reject(error);
          console.log(error.json());
      });
    });
  };

  workerLogin(email, password, user_type, slug) {
    return new Promise((resolve,reject) => { 
    var data = {email: email, password: password, user_type: user_type, slug:slug};
    console.log(data);
    let postUrl = this.url + 'users/worker/login';
    
    this.http
    .post(postUrl, data, this.options)
      .map(res => res.json())
      .subscribe(data => {
            this.user=data;
            localStorage.setItem('id_token',data.id);
            localStorage.setItem('auth_id',data.id);
            resolve(data);
      }, error => {
          reject(error);
          console.log(error.json());
      });
    });
  };

  workerShadowLogin(email, user_type) {
    return new Promise((resolve,reject) => { 
    var data = {email: email, user_type: user_type};
    console.log(data);
    let postUrl = this.url + 'users/worker/shadow_login';
    
    this.http
    .post(postUrl, data, this.options)
      .map(res => res.json())
      .subscribe(data => {
            this.user=data;
            localStorage.setItem('id_token',data.id);
            localStorage.setItem('auth_id',data.id);
            resolve(data);
      }, error => {
          reject(error);
          console.log(error.json());
      });
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    if(localStorage.getItem('admin') || localStorage.getItem('worker')){
      return true;
    }else{
      return false;
    }
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('admin');
    localStorage.removeItem('user_roles1');
    localStorage.removeItem('user_roles2');
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth_id');
    localStorage.removeItem('view_hotel');
    //location.replace("/login");
    // this.router.navigate(["login"]);

  };
};
