import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv }  from 'angular2-csv';
import { TipsService } from './providers/tips.service';
import * as _ from 'underscore';
import { PagerService } from './pager-service';

@Component({
  selector: 'ping',
  templateUrl: 'app/tip.comparison.component.html',
  providers: [TipsService]
})

export class TipComparisonComponent {
    response: any;
    tips: any;
    tipsArr: any;
    workerName:any;
    user = JSON.parse(localStorage.getItem('admin')); 
    loader:boolean=false;
    pager: any = {};
    pagedItems: any[];
  constructor(private auth: Auth, 
  private http: Http,
  private tipsService: TipsService,
  private authHttp: AuthHttp,
  private pagerService: PagerService) {
    this.loader = true;
    this.tipsService.adminTips(this.user.hotel_id)
      .then(data2 => {
      this.tips = data2;
      for(var i=0; i<this.tips.length; i++){
        this.tips[i].Name = this.tips[i].name;
        this.tips[i].Role = this.tips[i].worker_department;
        this.tips[i].NumberOfTips = this.tips[i].count;
        this.tips[i].TotalTips = this.tips[i].total;
        this.tips[i].AverageTip = this.tips[i].avg;
        this.tips[i].AverageRating = this.tips[i].avg_rating;
        delete this.tips[i].avg;
        delete this.tips[i].avg_rating;
        delete this.tips[i].total;
        delete this.tips[i].count;
        delete this.tips[i].worker_department;
        delete this.tips[i].name;
      }
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

   downloadCSV(){
    var options = {
      showLabels: true
    };
     new Angular2Csv(this.tips, 'Tips-Comparison',{ headers: Object.keys(this.tips[0]) });
  }

};