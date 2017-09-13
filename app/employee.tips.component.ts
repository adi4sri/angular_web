import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv }  from 'angular2-csv';
import { TipsService } from './providers/tips.service';
import {IMyDrpOptions, IMyDateRangeModel, IMyInputFieldChanged} from 'mydaterangepicker';
import * as _ from 'underscore';
import { PagerService } from './pager-service';

@Component({
  selector: 'ping',
  templateUrl: 'app/employee.tips.template.html',
  providers: [TipsService]
})

export class EmployeeTipsComponent {
  private myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        editableDateRangeField: false,
        openSelectorOnInputClick:true,
        width: "100%",
        firstDayOfWeek: "su"
    };
  model:Object;
  /*private model: Object = {
    beginDate: {year: 2018, month: 10, day: 9},
    endDate: {year: 2018, month: 10, day: 19}
  };*/
  start_date:any;
  end_date:any;
  tips: any;
  tipId:any[]=[];
  isCheckedAll:Boolean=false;
  user = JSON.parse(localStorage.getItem('admin')); 
  loader:boolean = false;
  workerName:any; 
  pager: any = {};
  pagedItems: any[];

  constructor(private auth: Auth, 
  private http: Http,
  private tipsService: TipsService,
  private authHttp: AuthHttp,
  private pagerService: PagerService) {
    this.loader = true;
    
    this.tipsService.getTipsHotel(this.user.hotel_id)
      .then(data2 => {
      this.tips = data2;
      this.setPage(1);
      this.loader = false;
      });
    
    

  }

  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.tips.length, page);
 
        // get current page of items
        this.pagedItems = this.tips.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

  selectId(value){
    if(this.tipId.includes(value)){
      this.tipId.splice(this.tipId.indexOf(value),1);
    }else{
     this.tipId.push(value); 
    }
  }

  selectAllId(){
    console.log(this.isCheckedAll);
    this.tipId=[];
    if(this.isCheckedAll){
      this.tipId=[];
      }else{
        this.tipId=[];
        for(var i=0; i<this.tips.length; i++){
            this.tipId.push(this.tips[i].id);  
        }
      }
    this.isCheckedAll = !this.isCheckedAll;
  }

  isChecked(value){
    return this.tipId.includes(value);
  }

  downloadCSV(){
    var options = {
      showLabels: true
    };
    for(var i=0; i<this.tips.length; i++){
      delete this.tips[i].id;
      delete this.tips[i].guest_auth_id;
      delete this.tips[i].guest_id;
      delete this.tips[i].hotel_id;
      delete this.tips[i].promotion_amount;
      delete this.tips[i].worker_auth_id;
      delete this.tips[i].worker_id;
    }
    //console.log(this.tips);
    new Angular2Csv(this.tips, 'Tips by employee',{ headers: Object.keys(this.tips[0]) });
  }

 onDateRangeChanged(event: IMyDateRangeModel) {
    this.loader = true;
    //this.model = [event.beginJsDate ,event.endJsDate];
    if(event.beginJsDate !== null){
    this.start_date = event.beginDate.year+'-'+event.beginDate.month+'-'+event.beginDate.day;
    this.end_date  = event.endDate.year+'-'+event.endDate.month+'-'+event.endDate.day;
    this.tipsService.getTipsDateRange(this.user.hotel_id, this.start_date, this.end_date)
        .then(data =>{
          this.tips = data;
          this.setPage(1);
          this.loader = false;
          })
        .catch((error)=>{
            console.log(error);
            this.loader = false;
          });
    }
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.loader = true;
    if(!event.valid){
      this.tipsService.getTipsHotel(this.user.hotel_id)
      .then(data2 => {
      this.tips = data2;
      this.setPage(1);
      this.loader = false;
      });  
    }
  }

};
