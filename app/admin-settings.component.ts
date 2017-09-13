import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
declare var $: any;
@Component({
  selector: 'admin-settings',
  templateUrl: 'app/admin-settings.component.html',
  providers: [WorkersService]
})

export class AdminSettingsComponent {

	
	name:any;
	email:any;
	login_type:any;
	fname:any;
	lname:any;
	errorMessage:any;
  errorForm:any;
  success:any;
	hotel_id:string;
  constructor(
    private auth: Auth, 
    private http: Http,
    private workerService: WorkersService,
    private authHttp: AuthHttp
    ){}

 select_login(value){
    this.login_type=value;
  }


  submitAdmin() {
  	this.name = this.fname + ' ' +this.lname;
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if(!this.fname || !this.lname || !this.email || !re.test(this.email)){
      this.errorForm="Please fill all fields correctly";
    }
    else{
    this.workerService.postAdmin(this.name, this.email, this.login_type)
      .then(data2 => {
        console.log(data2);
        // refresh pending worker list for display
        
        $('#addEmp').modal('hide');
        this.name='';
        this.email='';
        this.hotel_id='';
        this.login_type='';
        this.success = 'New user added successfully! An email has been sent to create password for login to bTIPt.';
      })
      .catch((error)=>{
        this.errorMessage = JSON.parse(error._body);
        }); // end post
    }
  }

};
