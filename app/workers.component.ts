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
  templateUrl: 'app/workers.template.html',
  providers: [WorkersService, HotelsService]
})
export class WorkersPage {
  //API_URL: string = 'http://13.59.184.105:9000';
  user = JSON.parse(localStorage.getItem('admin')); 
  message: string;
  workers: any;
  worker:any;
  id:any;
  workerForm: Boolean;
  f_name:any;
  l_name:any;
  name:any;
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
  hotel_data:Object;
  dept_selected:string;
  loader:boolean=false;
  send_success:any;
  pager: any = {};
  pagedItems: any[];
  tippers:any;
  updateForm:boolean;
  errorMessage:any;
  bankInfo:any;
  constructor(private auth: Auth, 
  private http: Http,
  private workerService: WorkersService,
  private authHttp: AuthHttp,
  private pagerService: PagerService,
  private hotelService: HotelsService) {
    this.id= this.user.id;
    this.worker=[];
    this.workerService.workerDetails(this.id)
      .then(data =>{
        this.worker = data[0];
        })
      .catch(error=>{
        
        });

    this.loader=true;
    this.workerService.getWorkers(this.user.hotel_id)
    .then(data => {
      this.workers = data;
      console.log(this.workers);
      this.setPage(1);
      this.loader=false;
      });

    this.hotelService.getHotels()
          .then(data2 => {
          this.hotels = data2;
            this.loader = false;        
          });


}

  search_worker(){
    this.loader=true;
    this.workerService.searchWorker(this.searchWorker)
      .then((data:any)=>{
        this.workers = data;
        this.loader=false;
        if(data.length > 0){
          this.setPage(1);
        }
      })
      .catch((error:any)=>{
        this.loader = false;
      });
  }

  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
 
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);
        

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
  }

  selectAllId(){
    console.log(this.isCheckedAll);
    this.workerId=[];
    if(this.isCheckedAll){
      this.workerId=[];
      }else{
        this.workerId=[];
        for(var i=0; i<this.workers.length; i++){
          if(this.workers[i].id !== this.id){
            this.workerId.push(this.workers[i].id);  
          }
        }
      }
    this.isCheckedAll = !this.isCheckedAll;
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
      this.workers = data;
      this.loader=false;
      this.workerService.getWorkers(this.user.hotel_id)
        .then(data => {
        this.workers = data;
        this.setPage(1);
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
    this.workerService.updateWorkerInfo(this.worker.name, this.worker.email, this.worker.id, this.worker.department, this.worker.status, this.worker.login_type)
      .then(result=>{
          this.workerService.getWorkers(this.user.hotel_id)
          .then(data => {
          this.workers = data;
          this.setPage(1);
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
          setTimeout(function(){
            document.getElementById("send_success").style.display = 'none';
          },3000);
        })
      .catch(error => {
        console.log(error);
        });
  }

  submitWorker() {
    if(this.user.user_type == 'worker'){
      this.hotel_id=this.user.hotel_id;
    }
    if(!this.hotel_department){
      this.hotel_department = "--";
    }
    this.loader=true;
    this.name = this.f_name + " " + this.l_name;
    if(!this.l_name || !this.f_name || !this.email || this.hotel_id == "none" || !this.login_type){
      this.errorMessage = 'Please fill all fields correctly';
    }else{
    this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.hotel_department)
      .then(data2 => {
        // refresh pending worker list for display
        this.workerService.getWorkers(this.user.hotel_id)
        .then(data => {
        this.workers = data;
        this.setPage(1);
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
        let msg = JSON.parse(error._body);
        if(msg){
          this.validEmail = 'Account already exist with this email!';
        }
        this.loader = false;
      }); // end post
    }
  }

  downloadCSV(){
    let emp = [];
    
    for(var i=0; i < this.workers.length; i++){
      emp.push({
        name:this.workers[i].name,
        login_type:this.workers[i].login_type=='0'?'Manager':'Employee',
        email:this.workers[i].email,
        department:this.workers[i].department,
        status:this.workers[i].status=='0'?'Inactive':'Active',
        activity:this.workers[i].activity,
        hotel_name:this.workers[i].hotel_name
      });
    }
    
    new Angular2Csv(emp, 'Employees',{ headers: Object.keys(emp[0]) });
  }
};
