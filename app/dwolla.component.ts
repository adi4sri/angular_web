import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';

import { TipsService } from './providers/tips.service';

@Component({
  selector: 'dwolla',
  templateUrl: 'app/dwolla.component.html',
  providers: [TipsService]
})

export class DwollaComponent {
    response: any;
    transfers: any;
    tipsArr: any;
    loader: any = false;
  constructor(private auth: Auth, 
  private http: Http,
  private tipsService: TipsService,
  private authHttp: AuthHttp) {
    this.loader = true;
    this.tipsService.get_dwolla_transfers()
      .then(data2 => {
      this.transfers = data2;
      this.loader = false;
        console.log(data2);        
      });

  }

};