import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthHttp} from 'angular2-jwt';
import {Auth} from '../auth.service';


@Injectable()
export class WorkersService {

    url: string = 'http://13.59.184.105:9000/';
  data1: any;
  tipsResponse: any;
  userAuthObj: any;
  userRes: any;
  authId: any;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });
  constructor(public http: Http, private authHttp: AuthHttp, public auth: Auth) {    
    //var toke = localStorage.getItem('id_token');
    console.log(localStorage.getItem('auth_id'));
    console.log(auth);

    //this.userAuthObj = auth.user;
    //this.authId = this.userAuthObj.user_id.substring(6); //remove auth0 header
    
  }

  checkEmp(emails){
    var json = { emails: emails};
    var params = json;
    return new Promise(resolve=>{
      this.http.post(this.url + 'users/check_workers',json, this.options)
      .map((res:any) => res.json())
      .subscribe((data:any)=>{
        resolve(data)
      });
    });
  }

  bulkEmp(workers, hotel_id){
    var postData={
      workers:workers,
      hotel_id:hotel_id
    };
    return new Promise((resolve,reject)=>{
      this.http.post(this.url + 'users/worker/bulk', postData, this.options)
        .map((res:any)=>res.json())
        .subscribe((data:any)=>{
          resolve(data)
        },
        (error:any)=>{
          reject(error);
        }
        );
    });
  }

  getReviews(id){
    return new Promise(resolve => {
      this.http.get(this.url + 'reviews/review/' + id)
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      });
  }

  getReviewsGraph(id){
    return new Promise(resolve => {
      this.http.post(this.url + 'reviews/graph/' + id, {})
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      });
  }

  getDailyReviews(id){
   return new Promise(resolve => {
      this.http.post(this.url + 'reviews/daily_review/' + id, {})
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      }); 
  }

  getWeeklyReviews(id){
   return new Promise(resolve => {
      this.http.post(this.url + 'reviews/weekly_review/' + id, {})
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      }); 
  }

  getMonthlyReviews(id){
   return new Promise(resolve => {
      this.http.post(this.url + 'reviews/monthly_review/' + id, {})
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      }); 
  }

  getYearlyReviews(id){
   return new Promise(resolve => {
      this.http.post(this.url + 'reviews/yearly_review/' + id, {})
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      }); 
  }

  getCountReviews(id){
    return new Promise(resolve => {
      this.http.get(this.url + 'reviews/review_count/' + id)
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      }); 
  }

  getAllWorkers(){
    return new Promise(resolve => {
      this.http.get(this.url + 'users/worker')
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
      });
  }

  workerDetails(worker_Id){
    var json = { 
      id: worker_Id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + 'users/worker_details', params, this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          });
      });
  }

  deleteWorkers(workerlId) {
    // Dont have the data yet
    return new Promise(resolve => {
      var json = { 
      id: workerlId
      };
      var params = json;
      this.http.post(this.url + 'users/worker/delete', params,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateWorkers(worker_Id, workerStatus) {
   // Dont have the data yet
    return new Promise(resolve => {
      var json = { 
      id: worker_Id,
      status: workerStatus
      };
      var params = json;
      this.http.post(this.url + 'users/worker/update', params,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  //get worker data by hotel
  getWorkers(hotelId) {
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + 'users/workers/hotel/' + hotelId)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

    //get pending worker data by hotel
  getAllowedWorkers(hotelId) {
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + 'users/allowed_workers/' + hotelId)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

    postAllowedWorker(workerName, email, department, hotel_id) {
    return new Promise((resolve,reject) => {
    var json = { hotel_id: hotel_id, name: workerName, email: email, department: department };
    var params = json;
    let postUrl = this.url + 'users/allowed_workers';

    this.http.post(postUrl,
        params, this.options)
        .map(res => res.json())
        .subscribe(data => {
            //this.userRes = data;
            resolve(data);
        },
        error => reject(error),
        () => console.log("Finished")
    );
    });
  }


    postWorker(name, email, hotel_id, login_type, department) {
    return new Promise((resolve,reject) => {
    var json = { hotel_id: hotel_id, name: name, email: email, login_type: login_type, department: department};
    var params = json;
    let postUrl = this.url + 'users/worker';

    this.http.post(postUrl,
        params, this.options)
        .map(res => res.json())
        .subscribe(data => {
            //this.userRes = data;
            resolve(data);
        },
        error => reject(error),
        () => console.log("Finished")
    );
    });
  }

  workerSignup(email, password){
    return new Promise((resolve, reject)=>{
      var json = {email: email, password: password};
      var param = json;
      let postUrl = this.url + 'users/worker/signup';

      this.http.post(postUrl, param, this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          },
          error => reject(error))
      });
  }

  bankInfo(userId, routingNumber, accountNumber, type, name){
   return new Promise((resolve, reject)=>{
      var json = {routingNumber: routingNumber, accountNumber: accountNumber,type:type, name:name};
      console.log(json);
      var param = json;
      let postUrl = this.url + 'users/worker/'+ userId + '/funding-sources';

      this.http.post(postUrl, param, this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          },
          error => reject(error))
      }); 
  }

  getBankInfo(userId){
   return new Promise((resolve, reject)=>{
      let postUrl = this.url + 'users/worker/'+ userId + '/funding-sources';
      this.http.get(postUrl)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          },
          error => reject(error))
      }); 
  }

  updateWorkerInfo(name, email, worker_id, department, status){
    return new Promise((resolve, reject) =>{
      var json = {name: name, email: email, id: worker_id, department:department, status:status};
      var params = json;
      let postUrl = this.url + 'users/worker/update_info';
      this.http.post(postUrl, params, this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log('UPDATEDATA',data);
          },
          error => reject(error),
          () => console.log("Finished")
        );
      });
  }


  postAdmin(name, email, login_type) {
      return new Promise((resolve,reject) => {
      var json = { name: name, email: email, login_type: login_type};
      var params = json;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let postUrl = this.url + 'users/admin';

      this.http.post(postUrl,
          params, {
              headers: headers
          })
          .map(res => res.json())
          .subscribe(data => {
              //this.userRes = data;
              resolve(data);
          },
          error => reject(error),
          () => console.log("Finished")
      );
      });
    }

  updateWorkerPassword(id, current_pass, new_password){
    return new Promise((resolve, reject) =>{
      var data = {id: id, password: current_pass, new_password:new_password};
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/worker/change_password';

      this.http.post(url, body, {headers: headers})
          .map(res => res.json())
          .subscribe(data1=>{
            resolve(data1);
            },
            error => reject(error),
            () => console.log('Password Update Finished')
            );
      });
  }
  
  updateAdminPassword(id, current_pass, new_password){
    return new Promise((resolve, reject) =>{
      var data = {id: id, password: current_pass, new_password:new_password};
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/admin/change_password';

      this.http.post(url, body, {headers: headers})
          .map(res => res.json())
          .subscribe(data1=>{
            resolve(data1);
            },
            error => reject(error),
            () => console.log('Password Update Finished')
            );
      });
  }

   adminRoles(location, employees, tippers, setting, user_type, login_type){
    return new Promise((resolve, reject) =>{
      var data = {location: location, admin_employees: employees, tip_center:tippers, setting:setting, user_type: user_type, login_type:  login_type};
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/admin_user_roles';

      this.http.post(url, body, {headers: headers})
          .map(res => res.json())
          .subscribe(data1=>{
            resolve(data1);
            },
            error => reject(error),
            () => console.log('User Roles Updated')
            );
      });
  }

  workerRoles(dashboard, employees, tip_comparison, tip_employee, reviews, user_type, login_type){
    return new Promise((resolve, reject) =>{
      var data = {
        dashboard: dashboard,
        employees: employees,
        tip_comparison:tip_comparison,
        tip_employee: tip_employee,
        reviews:reviews,
        user_type: user_type,
        login_type: login_type
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/worker_user_roles';

      this.http.post(url, body, {headers: headers})
          .map(res => res.json())
          .subscribe(data1=>{
            resolve(data1);
            },
            error => reject(error),
            () => console.log('User Roles Updated')
            );
      });
  }

  resend_token(email){
    return new Promise((resolve, reject)=>{
      var data={email:email};
      var params = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/worker/resend_token';

      this.http.post(url, params, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {resolve(data);}, error => reject(error),
         () => console.log('Email Sent'))
      });
  }

  forgotPassword(email){
    return new Promise((resolve,reject)=>{
      var data={
        email:email
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/forgot_password';
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Email sent')
          )
      });
  }

  forgotPassAdmin(email){
    return new Promise((resolve,reject)=>{
      var data={
        email:email
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/admin/forgot_password';
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Email sent')
          )
      });
  }

  createPassword(token,password){
    return new Promise((resolve,reject)=>{
      var data={
        password:password
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/reset_password/' + token;
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Password reset successfully')
          )
      });
  }


  createNewPassword(token,password){
    return new Promise((resolve,reject)=>{
      var data={
        password:password
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/create_password/' + token;
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Password reset successfully')
          )
      });
  }

  createPassAdmin(token,password){
    return new Promise((resolve,reject)=>{
      var data={
        password:password
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/admin/reset_password/' + token;
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Password reset successfully')
          )
      });
  }



  createNewPassAdmin(token,password){
    return new Promise((resolve,reject)=>{
      var data={
        password:password
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/admin/create_password/' + token;
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Password reset successfully')
          )
      });
  }

  resetPassGuest(token,password){
    return new Promise((resolve,reject)=>{
      var data={
        password:password
      };
      var body = data;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let url = this.url + 'users/guest/reset_password/' + token;
      
      this.http.post(url, body, {headers:headers})
        .map(res=>res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('Password reset successfully')
          )
      });
  }

  getRoles(user_type){
    return new Promise((resolve,reject)=>{
      let url = this.url + 'users/user_roles/' + user_type;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data=>{
          resolve(data);
          },
          error=>reject(error),
          ()=>console.log('User roles finished')
          )
      });
  }


}