import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';

import { WorkersService } from './providers/workers.service';
declare var $: any;
@Component({
  selector: 'ping',
  templateUrl: 'app/pending-workers.template.html',
  providers: [WorkersService]
})

export class PendingWorkersPage {
  API_URL: string = 'http://13.59.184.105:9000';
  message: string;
  workers: any;
  workerForm: Boolean;
  workerName: any;
  email: any;
  searchWorker:any;
  department: any;

  constructor(private auth: Auth, 
  private http: Http,
  private workerService: WorkersService,
  private authHttp: AuthHttp) {

    this.workerForm = false;
      
    // by hotel id
    this.workerService.getAllowedWorkers(1)
      .then(data2 => {
      this.workers = data2;
        console.log(data2);        
      });
  }


  showForm() {
    this.workerForm = true;
  }

  hideForm() {
    this.workerForm = false;
  }

  // add worker to allowed workers list for signup - need to put in real hotel_id here
  submitWorker() {
    this.workerService.postAllowedWorker(this.workerName, this.email, this.department, 1)
      .then(data2 => {
        console.log(data2);
        // refresh pending worker list for display
        this.workerService.getAllowedWorkers(1)
        .then(data2 => {
        this.workers = data2;
            console.log(data2);        
        });  
        $('#addEmpModal').modal('hide');
      }); // end post
  }
};
