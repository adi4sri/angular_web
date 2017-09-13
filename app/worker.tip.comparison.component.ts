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
  templateUrl: 'app/worker.tip.comparison.component.html',
  providers: [TipsService]
})

export class WorkerTipComparisonComponent {
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
    this.tipsService.workerTipsComparison(this.user.id)
      .then(data2 => {
      this.tips = data2;
      this.setPage(1);
      this.loader = false;
        console.log(data2);        
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
    new Angular2Csv(this.tips, 'Tips-Comparison',options);
  }

};