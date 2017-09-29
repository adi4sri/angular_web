import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthHttp} from 'angular2-jwt';
import {Auth} from '../auth.service';

@Injectable()
export class TipsService {

    url: string = 'http://13.59.184.105:9000/tips';
  data1: any;
  tipsResponse: any;
  userAuthObj: any;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });
  constructor(public http: Http, private authHttp: AuthHttp, public auth: Auth) {
    //console.log(auth.user);
    //this.userAuthObj = auth.user;
  }

  load() {
    if (this.data1) {
      return Promise.resolve(this.data1);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/?results=10')
        .map(res => res.json())
        .subscribe(data => {
          this.data1 = data.results;
          resolve(this.data1);
        });
    });
  }

  monthly_chart_data(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise((resolve,reject) =>{
      this.http.post(this.url + '/chart_data', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
      });
  }

  emp_monthly_chart(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise((resolve,reject) =>{
      this.http.post(this.url + '/emp_chart_month', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
      });
  }
  weekly_chart_data(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/weekly_chart_data', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  emp_weekly_chart(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise((resolve,reject) =>{
      this.http.post(this.url + '/emp_chart_week', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
      });
  }

  yearly_chart_data(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/yearly_chart_data', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  emp_yearly_chart(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise((resolve,reject) =>{
      this.http.post(this.url + '/emp_chart_year', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
      });
  }

  daily_chart_data(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/daily_chart_data', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  emp_daily_chart(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise((resolve,reject) =>{
      this.http.post(this.url + '/emp_chart_daily', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        },(error)=>{
          reject(error);
        });
      });
  }

  top_tipped_emp(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/top_tipped_emp', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  yearly_top_tipped(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/yearly_top_tipped', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  weekly_top_tipped(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/weekly_top_tipped', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  daily_top_tipped(id){
    var json = { 
      id: id
      };
      var params = json;
    return new Promise(resolve =>{
      this.http.post(this.url + '/daily_top_tipped', params,this.options)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
      });
  }

  getAllTips(){
    return new Promise(resolve => {
      this.http.get(this.url + '/all')
      .map(res => res.json())
      .subscribe(data2 =>{
        resolve(data2);
        });
      });
  }

  chart(){
    return new Promise(resolve => {
      this.http.post(this.url + '/chart',{})
      .map(res => res.json())
      .subscribe(data2 =>{
        resolve(data2);
        });
      }); 
  }

  deleteTip(tipperId){
    var json = { 
      id: tipperId
      };
      var params = json;
    return new Promise(resolve => {
      this.http.post(this.url + '/delete',params,this.options)
      .map(res => res.json())
      .subscribe(data2 =>{
        resolve(data2);
        });
      });
  }

    getTips(userID) {
    if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + '/' + userID)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;

            // make a display friendly timestamp
            for(let i = 0; i < this.tipsResponse.length; i++) {
                this.tipsResponse[i].tip_time = new Date(this.tipsResponse[i].tip_time);
            }
          resolve(this.tipsResponse);
        });
    });
  }

  getWorkerTips(userId){
    return new Promise(resolve =>{
      this.http.get(this.url+'/workers/'+userId)
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data)
          });
      });
  }
  
  // worker tip list
    getTipsHotel(hotel) {
    
    return new Promise(resolve => {
      this.http.get(this.url + '/' + 'hotels/' + hotel)
        .map(res => res.json())
        .subscribe(data => {
          

            // make a display friendly timestamp
            /*for(let i = 0; i < this.tipsResponse.length; i++) {
                this.tipsResponse[i].tip_time = new Date(this.tipsResponse[i].tip_time);
            }*/
          resolve(data);
        });
    });
  }

  getTipsDateRange(hotel, start_date, end_date) {
    var json = { 
      start_date: start_date,
      end_date: end_date
    };
    console.log(hotel,json);
    var params = json;
    let postUrl = this.url + '/' + 'tip_daterange/' + hotel

    /*if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }*/
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.post(postUrl, params, this.options)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;

            // make a display friendly timestamp
            /*for(let i = 0; i < this.tipsResponse.length; i++) {
                this.tipsResponse[i].tip_time = new Date(this.tipsResponse[i].tip_time);
            }*/
          resolve(data);
        });
    });
  }

  getWorkerTipsDateRange(workerId, start_date, end_date) {
    var json = { 
      start_date: start_date,
      end_date: end_date
    };
    
    var params = json;
    let postUrl = this.url + '/worker_tip_daterange/' + workerId

    /*if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }*/
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.post(postUrl, params, this.options)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;
          resolve(data);
        });
    });
  }

    // tip calculations
    adminTips(hotel) {
    if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + '/' + 'tip_math/' + hotel)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;

          resolve(this.tipsResponse);
        });
    });
  }

  workerTipsComparison(worker) {
    if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + '/' + 'worker_tip_math/' + worker)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;

          resolve(this.tipsResponse);
        });
    });
  }

      // dashboard calculations
    dashboard(hotel) {
    if (this.tipsResponse) {
      return Promise.resolve(this.tipsResponse);
    }
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url + '/' + 'dashboard/' + hotel)
        .map(res => res.json())
        .subscribe(data => {
          this.tipsResponse = data;

          resolve(this.tipsResponse);
        });
    });
  }

  confirmWorker(workerEmail) {
    return new Promise(resolve => {
      this.http.get('http://13.59.184.105:9000/users/worker/confirm/' + workerEmail)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
  get_dwolla_transfers() {
    return new Promise(resolve => {
      this.http.get('http://13.59.184.105:9000/users/dwolla/account/transfers')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }


    postTip(tipAmount, workerEmail) {
    return new Promise((resolve,reject) => {
    var json = { guest_auth_id: this.userAuthObj.user_id.substring(6), amount: tipAmount, worker_email: workerEmail };
    var params = json;
    let postUrl = this.url;

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


  
}