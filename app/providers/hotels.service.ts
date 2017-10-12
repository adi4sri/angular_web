import { Injectable} from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthHttp} from 'angular2-jwt';
import {Auth} from '../auth.service';


@Injectable()
export class HotelsService {

    url: string = 'http://13.59.184.105:9000/hotels/';
  data1: any;
  tipsResponse: any;
  userAuthObj: any;
  userRes: any;
  authId: any;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(public http: Http, private authHttp: AuthHttp, public auth: Auth) {    
    //var toke = localStorage.getItem('id_token');

    //this.userAuthObj = auth.user;
    //this.authId = this.userAuthObj.user_id.substring(6); //remove auth0 header
    
  }

  countEmp(hotel_id){
    return new Promise(resolve =>{
      this.http.get(this.url+'/count_workers/'+hotel_id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
        });
      });
  }


  //get hotels
  getHotels() {
    // Dont have the data yet
    return new Promise(resolve => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateHotels(hotelId, hotelStatus) {
   // Dont have the data yet
    return new Promise(resolve => {
      var json = { 
      id: hotelId,
      status: hotelStatus
      };
      var params = json;
      var headers = new Headers();
    headers.append('Content-Type', 'application/json');
      this.http.post(this.url + '/status', params,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  addDepartments(hotel_id, departments){
    return new Promise(resolve => {
    var json={
      id: hotel_id,
      departments: departments
    };
    var body = json;
    this.http.post(this.url + '/department',body, this.options)
      .map(res => res.json())
      .subscribe(data =>{
        resolve(data);
        });
    });
  }


  deleteHotels(hotelId) {
    // Dont have the data yet
    return new Promise(resolve => {
      var json = { 
      id: hotelId
      };
      var params = json;
      this.http.post(this.url + 'delete', params,this.options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

    postHotel(hotelName, hotelCity, hotelAddress, hotelZip, hotelEmail, hotelEmployee, hotelSubDomain) {
    return new Promise((resolve,reject) => {
    var json = { 
      name: hotelName, 
      city: hotelCity, 
      address:hotelAddress,
      zip_code: hotelZip, 
      contact_email: hotelEmail,
      emp_name: hotelEmployee,
      slug: hotelSubDomain
    };
    var params = json;
    this.http.post(this.url,
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