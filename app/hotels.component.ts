import { Component, Pipe, PipeTransform } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import { TipsService } from './providers/tips.service';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { Angular2Csv }  from 'angular2-csv';
import { HotelsService } from './providers/hotels.service';
import { WorkersService } from './providers/workers.service';
import * as _ from 'underscore';
import { PagerService } from './pager-service';
declare var $: any;
@Component({
  selector: 'ping',
  templateUrl: 'app/hotels.template.html',
  providers: [HotelsService, TipsService, WorkersService]
})

export class HotelsPage {
  user = JSON.parse(localStorage.getItem('admin'));
  role = JSON.parse(localStorage.getItem('user_roles2'));
  API_URL: string = 'http://13.59.184.105:9000';
  message: string;
  hotels: any;
  hotelForm: Boolean;
  hotelName: any;
  hotelCity: any;
  hotelAddress: any;
  hotelZip: any;
  hotelEmail: any;
  hotelSubDomain:any;
  hotelEmployee: any;
  workers:any;
  searchHotel:any;
  selectAll:Boolean = false;
  hotelId:any[]=[];
  isCheckedAll:Boolean=false;
  tips: { avg:any, employees:any, total:any, total_tips:any, __proto__:any  };
  show: Boolean;
  tippers:any;
  worker_count:any[]=[];
  count:any;
  reviews:any;
  loader: boolean = false;
  v_data:any;
  view_mode:boolean;
  pager: any = {};
  pagedItems: any[];
  totalamount:any;
  errorMessage:any;
  hideLoc:boolean = false;
  shadow:any;
  constructor(private auth: Auth, 
  private http: Http,
  private authHttp: AuthHttp,
  private hotelService: HotelsService,
  private tipsService: TipsService,private pagerService: PagerService,
  private workersService: WorkersService, private router:Router) {
    this.loader = true;
    this.hotelForm = false;
    this.hotelService.getHotels()
      .then(data2 => {
        this.hotels = data2;
        this.setPage(1);
        this.loader = false;
      });

      /*this.tipsService.dashboard(this.user.hotel_id)
      .then((data2:any) => {
        this.tips = data2;
        this.loader = false;
      });*/

      this.tipsService.getAllTips()
        .then(data2 =>{
          this.tippers = data2;
          this.loader = false;
          
              let total = 0;
              for (var i = 0; i < this.tippers.length; i++) {
                  if (this.tippers[i].amount) {
                      total += parseFloat(this.tippers[i].amount);
                      this.totalamount = total;
                  }
              }
          
        });

      this.workersService.getAllWorkers()
        .then(data2 => {
          this.workers = data2;
          this.loader = false;
          for(let i=0; i < this.workers.length; i++){
            this.worker_count.push(this.workers[i].hotel_id);
          }
          this.worker_count.sort();

     });

  }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.hotels.length, page);
 
        // get current page of items
        this.pagedItems = this.hotels.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    next(){
      if(!this.hotelName || !this.hotelCity || !this.hotelAddress || !this.hotelZip || !this.hotelEmail || !this.hotelSubDomain){
        this.errorMessage = 'Please fill all the fields correctly';
      }
      else{
        this.hideLoc = true;
      }
    }
    back(){
        this.hideLoc = false;
    }

  updateHotelStatus(hotelId,status){
    this.loader = true;
    this.hotelService.updateHotels(hotelId, status)
    .then(data =>{
      this.loader = false;
      });
  }

  view_hotel(hotel_id, hotel_email){
    if(hotel_id && hotel_email){
      this.loader = true;
      this.shadow = this.user;
      localStorage.setItem("shadow", JSON.stringify(this.shadow));
      localStorage.setItem("shadow_roles1", JSON.stringify(this.shadow.user_roles_super));
      localStorage.setItem("shadow_roles2", JSON.stringify(this.shadow.user_roles_admin));
      this.auth.workerShadowLogin(hotel_email, "worker")
        .then((data:any)=>{
          this.v_data = data;
          this.v_data.hotel_id=hotel_id;
          this.v_data.user_type = "worker";
          localStorage.setItem("admin", JSON.stringify(this.v_data));
          localStorage.setItem("user_roles1", JSON.stringify(this.v_data.user_roles_manager));
          localStorage.setItem("user_roles2", JSON.stringify(this.v_data.user_roles_worker));
          this.view_mode = true;
          localStorage.setItem("view_hotel", JSON.stringify(this.view_mode));
          this.router.navigate(['/home']);
          setTimeout(function(){ window.location.reload(); }, 100);
          this.loader = false;
        })
        .catch((error:any)=>{
          console.log(error);
          if(error && error._body){
            var err = JSON.parse(error._body);
            alert(err.message);
            this.loader = false;
          }
        })
      //window.location.reload();
    }
    else{
      console.log(hotel_email, hotel_id);
      this.loader = false;
    }
  }




 selectId(value){
    if(this.hotelId.includes(value)){
      this.hotelId.splice(this.hotelId.indexOf(value),1);
    }else{
     this.hotelId.push(value); 
    }
  }

  selectAllId(){
    this.hotelId=[];
    if(this.isCheckedAll){
      this.hotelId=[];
      }else{
        this.hotelId=[];
        for(var i=0; i<this.hotels.length; i++){
            this.hotelId.push(this.hotels[i].id);  
        }
      }
    this.isCheckedAll = !this.isCheckedAll;
  }


  isChecked(value){
   return this.hotelId.includes(value);
  }


  deleteHotel(){
    this.loader = true;
    this.hotelService.deleteHotels(this.hotelId)
    .then(data =>{
      this.hotels = data;
      this.hotelService.getHotels()
        .then(data2 => {
        this.hotels = data2;
        this.setPage(1);
          this.loader = false;
        });
      this.tipsService.getAllTips()
        .then(data2 =>{
          this.tippers = data2;
          this.loader = false;
          let total = 0;
          for (var i = 0; i < this.tippers.length; i++) {
            if (this.tippers[i].amount) {
              total += parseFloat(this.tippers[i].amount);
              this.totalamount = total;
            }
          }
        });
        this.workersService.getAllWorkers()
        .then(data2 => {
          this.workers = data2;
          this.loader = false;
          for(let i=0; i < this.workers.length; i++){
            this.worker_count.push(this.workers[i].hotel_id);
          }
          this.worker_count.sort();

       });// close refresh

      })
    .catch(error =>{
        this.loader = false;
      });
  }

  showForm() {
    this.hotelForm = true;
  }

  hideForm() {
    this.hotelForm = false;
  }
  displayHotel(hotel) {
    // this.hotelForm = false;
  }

  //add worker to allowed workers list for signup - need to put in real hotel_id here
  submitHotel() {
    this.loader = true;
    if(!this.hotelName || !this.hotelCity || !this.hotelAddress || !this.hotelZip || !this.hotelEmail || !this.hotelEmployee || !this.hotelSubDomain){
      this.errorMessage = 'Please fill all the fields correctly';
      this.loader = false;       
    }
    else{
        this.hotelService.postHotel(this.hotelName, this.hotelCity, this.hotelAddress, this.hotelZip, this.hotelEmail, this.hotelEmployee, this.hotelSubDomain)
          .then(data => {
          // refresh hotel list  
          this.hotelService.getHotels()
            .then(data2 => {
            this.hotels = data2;
            this.setPage(1);
              this.loader = false;       
            });
            this.tipsService.getAllTips()
            .then(data2 =>{
              this.tippers = data2;
              this.loader = false;
              let total = 0;
              for (var i = 0; i < this.tippers.length; i++) {
                if (this.tippers[i].amount) {
                  total += parseFloat(this.tippers[i].amount);
                  this.totalamount = total;
                }
              }
            });
            this.workersService.getAllWorkers()
            .then(data2 => {
              this.workers = data2;
              this.loader = false;
              for(let i=0; i < this.workers.length; i++){
                this.worker_count.push(this.workers[i].hotel_id);
              }
              this.worker_count.sort();

           });// close refresh
            this.hotelForm = false;
            $('#addHotelModal').modal('hide');
            this.hotelName='';
            this.hotelCity='';
            this.hotelAddress='';
            this.hotelZip=''
            this.hotelEmail='';
            this.hotelEmployee='';
            this.hideLoc = false;
          })
          .catch(error =>{
            console.log(error);
            this.errorMessage = JSON.parse(error._body);
            this.errorMessage = this.errorMessage.error;
            this.loader = false;  
            });}
  }

  downloadCSV(){
    var options = {
      showLabels: true
    };
     var hotels = [];
   
    for(var i=0; i < this.hotels.length; i++){
      hotels.push({
        name:this.hotels[i].name,
        city:this.hotels[i].city,
        account_creation:this.hotels[i].account_creation,
        address:this.hotels[i].address,
        zip_code:this.hotels[i].zip_code,
        status:this.hotels[i].status=='0'?'Inactive':'Active',
        email:this.hotels[i].email,
        number_of_employees:this.hotels[i].count,
      });
    }
    new Angular2Csv(hotels, 'Hotels', {headers: Object.keys(hotels[0])});
  }
};
