import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http, Response }      from '@angular/http';
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
  successMessage:any;
  file:any;
  csvUrl:any;
  csvData: any[] = [];
  emails:any[]=[];
  email_taken:any;
  checked_emails:any[]=[];
  empty_file:any = "Please select a CSV file to upload employees";
  hotel_error:any;
  workers_hotel:any;
  dropdown_hotels:any;
  bankInfo:any;
  constructor(private auth: Auth, 
  private http: Http,
  private workerService: WorkersService,
  private authHttp: AuthHttp,
  private hotelService: HotelsService,
  private pagerService: PagerService) {

    this.id= this.user.id;
    this.worker=[];
    this.workerService.workerDetails(this.id)
      .then(data =>{
        this.worker = data[0];
        console.log(this.worker);
        })
      .catch(error=>{
        
        });


    this.loader=true;
    this.workerService.getAllWorkers()
    .then(data => {
      this.workers = data;
      this.setPage(1);
      this.loader=false;
      });

    this.hotelService.getHotels()
          .then(data2 => {
          this.hotels = data2;
          this.dropdown_hotels=data2;
            
            this.dropdown_hotels.unshift({id:'none', name:'Please Select Hotel'});
            this.workers_hotel = this.dropdown_hotels[0].id;
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

extractData(res: any) {
    this.empty_file='';
    console.log(res);
    var lines=res.split("\n");
    var result = [];
    var headers=["name", "email", "department", "status"];
    this.emails = [];

  for(var i=0;i < lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(",");
      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }
      if(obj['name'] && obj['email'] && obj['department'] && obj['status']){
        result.push(obj);
      }
  }
  this.csvData = result; //JavaScript object
  console.log(this.csvData);
  /*if(headers){
    if(headers[0]!='name' || headers[1]!='email' || headers[2]!='department' || headers[3]!='status'){
      this.empty_file = "CSV must include headers i.e., name, email, department and status";
    }
    else{
      this.empty_file ='';
    }
  }*/
  for (var i=0; i<this.csvData.length; i++){
    if((!this.csvData[i].email) || (this.csvData[i].email == "")){
      this.empty_file = "Email is required in CSV.";
    }
    this.emails.push(this.csvData[i].email);
    console.log(this.csvData[i].email);
    
  }

  for (var i=0; i<this.csvData.length; i++){
    if(!this.csvData[i].status){
        this.empty_file = "Status is required and can be 0 or 1 (inactive or active).";
    }
    //this.emails.push(this.csvData[i].email);
  }
  
  for(var i = 0; i <= this.emails.length; i++) {
        for(var j = i; j <= this.emails.length; j++) {
            if(i != j && this.emails[i] == this.emails[j]) {
                this.empty_file = "CSV contains duplicate emails";
            }
        }
  }
}

handleHotelSelect(){
  if(this.empty_file){
    this.empty_file =this.empty_file;
  }
  else if(this.workers_hotel == 'none'){
    this.hotel_error = "Please select hotel";
  }else {
    this.hotel_error ="";
  }  
}
handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];
      var reader = new FileReader();

      if(!file){
          this.empty_file = "Please select a CSV file to upload employees";
      }
      else{
        this.empty_file ="";
        this.handleHotelSelect();
      reader.readAsText(file);
      reader.onload = (event:any) => {
        var csv = event.target.result; // Content of CSV file
        //console.log(event.target.result);
        this.extractData(csv); //Here you can call the above function.
      }
    }
}

checkEmp(){

  var emails =  this.emails.join();
  this.loader = true;
  this.errorMessage = '';
  this.successMessage = '';
  this.checked_emails = [];
  this.workerService.checkEmp(emails)
  .then((data:any) =>{
    if(data.length > 0){
      for(var i=0; i<data.length; i++){
        this.checked_emails.push(data[i].email);
      }
      this.loader = false;
    }
    else if(this.csvData){
      this.workerService.bulkEmp(this.csvData, this.workers_hotel)
      .then((data1:any)=>{
        this.workerService.getAllWorkers()
          .then((data2:any) => {
            this.workers = data2;
            this.successMessage = 'Employees added successfully';
            this.loader=false;      
          });

      })
      .catch((error1:any)=>{
        this.errorMessage = 'Cannot add employees! One or more emails in data are already exist in Dwolla';
        console.log(this.errorMessage);
        
        this.loader = false;

      });
    }
    else{
      this.errorMessage = 'Please add employees data to upload!'
      this.loader = false;
    }
  })
  .catch((error:any)=>{
    console.log(error);
    this.loader = false;
  });
}


  updateWorker(worker_Id,status){
    this.loader=true;
    this.workerService.updateWorkers(worker_Id, status)
    .then(data1 =>{
      this.workerService.getAllWorkers()
            .then(data => {
            this.workers = data;
            this.setPage(1);
                this.loader=false;      
            });  
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
            this.workerId.push(this.workers[i].id);  
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
      this.loader=false;
      this.workers = data;
      this.workerService.getAllWorkers()
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
          this.workerService.getAllWorkers()
          .then(data => {
             this.workers = data;
             this.setPage(1);  
              $('#updateEmpModal').modal('hide');
              this.loader=false;      
          });  
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
    }else{
        this.loader=true;
        this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.dept_selected)
          .then(data2 => {
            // refresh pending worker list for display
            this.workerService.getAllWorkers()
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
            this.validEmail = 'Sorry! User already exist with this email.';
            this.loader=false;      

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
  setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
 
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);

    }


};
