import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { TipsService }      from './providers/tips.service';
import { Angular2Csv }  from 'angular2-csv';
 
import * as _ from 'underscore';
 
import { PagerService } from './pager-service';

@Component({
  selector: 'tipper',
  templateUrl: 'app/tippers.component.html'
})

export class TippersComponent {

	tippers:any;
  //tippers: any[];
	tipperId:any[]=[];
  loader: boolean = false;

  pager: any = {};
  pagedItems: any[];
	isCheckedAll:any;
	constructor(
    private auth: Auth, 
    private http: Http,
    private authHttp: AuthHttp,
    private tipsService: TipsService,
    private pagerService: PagerService
    ){
   // initialize to page 1
         this.loader = true;
      this.tipsService.getAllTips()
        .then(data2 =>{
          this.tippers = data2;
          //console.log(this.tippers);
          this.loader = false;
        this.setPage(1);
        });
  	}

  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.tippers.length, page);
 
        // get current page of items
        this.pagedItems = this.tippers.slice(this.pager.startIndex, this.pager.endIndex + 1);

    }

	isChecked(value){
	    return this.tipperId.includes(value);
	}

	selectId(value){
    	if(this.tipperId.includes(value)){
      		this.tipperId.splice(this.tipperId.indexOf(value),1);
    	}else{
     		this.tipperId.push(value); 
    	}
  	}

	selectAllId(){
    	this.tipperId=[];
    	if(this.isCheckedAll){
      	this.tipperId=[];
      	}
      	else{
        	this.tipperId=[];
        	for(var i=0; i<this.tippers.length; i++){
            	this.tipperId.push(this.tippers[i].id);  
        	}
      	}
    	this.isCheckedAll = !this.isCheckedAll;
  	}

  	deleteTipper(){
      this.loader = true;
	    this.tipsService.deleteTip(this.tipperId)
	    .then(data =>{
	      this.tippers = data;

	      this.tipsService.getAllTips()
	        .then(data => {
	        this.tippers= data;
          this.setPage(1);
            this.loader = false;      
	        });// close refresh
	      });
  	}

  	downloadCSV(){
      var options = {
        showLabels: true
      };
       var tippers = this.tippers;
    for(var i=0; i < tippers.length; i++){
      delete tippers[i].guest_auth_id;
      delete tippers[i].guest_id;
      delete tippers[i].hotel_id;
      delete tippers[i].id;
      delete tippers[i].promotion_amount;
      delete tippers[i].worker_auth_id;
      delete tippers[i].worker_id;
    }
    	new Angular2Csv(this.tippers, 'Tippers',{ headers: Object.keys(tippers[0]) });
  	}
};
