import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2Csv }  from 'angular2-csv';
import { WorkersService } from './providers/workers.service';
import { HotelsService } from './providers/hotels.service';
import * as _ from 'underscore';
import { PagerService } from './pager-service';
declare var $: any;
@Component({
  selector: 'ping',
  templateUrl: 'app/admin-workers.html',
  providers: [WorkersService, HotelsService]
})

export class AdminWorkers {
  //API_URL: string = 'http://13.59.184.105:9000';
  user = JSON.parse(localStorage.getItem('admin')); 
  message: string;
  workers: any;
  worker:any;
  id:any;
  workerForm: Boolean;
  updateForm: Boolean;
  name:any;
  f_name:any;
  l_name:any;
  email:any;
  hotel_id:any;
  login_type:any;
  searchWorker:any;
  hotels:any;
  workerId:any[]=[];
  workerStatus:any;
  isCheckedAll:Boolean=false;
  validEmail:any;
  hotel_department:any;
  hotel_data:any;
  dept_selected:string;
  loader:boolean = false;
  u_name: any;
  status:any;
  send_success:any;
   pager: any = {};
  pagedItems: any[];
  tippers:any;
  errorMessage:any;
  constructor(private auth: Auth, 
  private http: Http,
  private workerService: WorkersService,
  private authHttp: AuthHttp,
  private hotelService: HotelsService,
  private pagerService: PagerService) {
      console.log('user',this.user);
    this.id= this.user.id;
    this.worker=[];
    this.workerService.workerDetails(this.id)
      .then(data =>{
        this.worker = data[0];
        })
      .catch(error=>{
        
        });


    this.loader=true;
    this.workerService.getAllWorkers()
    .then(data => {
      this.workers = data;
      this.setPage(1);
      this.loader=false;
      console.log(data);
      });

    this.hotelService.getHotels()
          .then(data2 => {
          this.hotels = data2;
            console.log(data2);
            this.loader = false;        
          });
  }

  

  updateWorker(worker_Id,status){
    this.loader=true;
    this.workerService.updateWorkers(worker_Id, status)
    .then(data =>{
     this.loader=false;
      });
  }
  select_hotel(hotel){
    console.log(hotel);
  }

  selectId(value){
    if(this.workerId.includes(value)){
      this.workerId.splice(this.workerId.indexOf(value),1);
    }else{
     this.workerId.push(value); 
    }
     console.log('saalim',this.workerId)
  }

  selectAllId(){
    console.log(this.isCheckedAll);
    this.workerId=[];
    if(this.isCheckedAll){
      this.workerId=[];
      }else{
        this.workerId=[];
        for(var i=0; i<this.workers.length; i++){
            this.workerId.push(this.workers[i].id);  
        }
      }
    this.isCheckedAll = !this.isCheckedAll;
    console.log('saalim1',this.workerId);
  }


  isChecked(value){
    return this.workerId.includes(value);
  }

  select_login(value){
    this.login_type=value;
  }

  deleteWorker(){
    this.loader=true;
    this.workerService.deleteWorkers(this.workerId)
    .then(data =>{
      this.loader=false;
      this.workers = data;
      console.log('data');
      this.workerService.getAllWorkers()
        .then(data => {
        this.workers = data;
        this.setPage(1);
          console.log(data);   
          this.loader = false;     
        });// close refresh

      });
  }

  showForm() {
    this.workerForm = true;
  }

  hideForm() {
    this.workerForm = false;
  }

  showUpdateForm(id){
    this.updateForm = true;
     this.workerService.workerDetails(id)
      .then(data =>{
        this.worker = data[0];
        console.log('Worker',this.worker);
        })
      .catch(error=>{
        console.log(error);
        });
  }
  hideUpdateForm(){
   this.updateForm = true; 
  }

  updateWorkerInfo(){
    this.loader = true;
    this.workerService.updateWorkerInfo(this.worker.name, this.worker.email, this.worker.id, this.worker.department, this.worker.status)
      .then(result=>{
          console.log(result);  
          this.workerService.getAllWorkers()
          .then(data => {
          this.workers = data;

              this.loader=false;      
          });  
          $('#updateEmpModal').modal('hide');
        })
      .catch(error => {
       console.log(error);
        });
  }

  resend_account_link(){
    this.loader = true;
    this.workerService.resend_token(this.worker.email)
      .then(data => {
          this.send_success = 'Email has been sent successfully!';
          this.loader = false;
        })
      .catch(error => {
        console.log(error);
        });
  }

  submitAdminWorker() {
    if(this.user.user_type == 'admin'){
      this.hotel_id=this.hotel_data.id;
    }
    if(!this.dept_selected){
      this.dept_selected = 'none';
    }
    this.name = this.f_name + " " + this.l_name;
    if(!this.l_name || !this.f_name || !this.email || this.hotel_id == "none" || !this.login_type){
      this.errorMessage = 'Please fill all fields correctly';
      console.log(this.errorMessage);
    }else{
        this.loader=true;
        this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.dept_selected)
          .then(data2 => {
            console.log(data2);
            // refresh pending worker list for display
            this.workerService.getAllWorkers()
            .then(data => {
            this.workers = data;
            this.setPage(1);
                console.log(data);  
                this.loader=false;      
            });  
            $('#addEmpModal').modal('hide');
            this.f_name='';
            this.l_name='';
            this.email='';
            this.hotel_id='';
            this.login_type='';
          })
          .catch(error=>{
            this.validEmail = 'Sorry! User already exist with this email.';
          }); // end post
        }
  }

  downloadCSV(){
    var options = {
      showLabels: true
    };
    var emp = this.workers;
    for(var i=0; i < emp.length; i++){
      delete emp[i].account_balance;
      delete emp[i].account_creation;
      delete emp[i].age;
      delete emp[i].auth_id;
      delete emp[i].cust_id;
      delete emp[i].hotel_id;
      delete emp[i].id;
      delete emp[i].password_reset_token;
      delete emp[i].password_token_expires;
      delete emp[i].social_id;
      delete emp[i].social_type;
      delete emp[i].password;
    }
    
    new Angular2Csv(emp, 'Employees',{ headers: Object.keys(emp[0]) });
  }
  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
 
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pager);
        console.log(this.pagedItems);
        console.log(this.tippers);

    }
};