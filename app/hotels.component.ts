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
  constructor(private auth: Auth, 
  private http: Http,
  private authHttp: AuthHttp,
  private hotelService: HotelsService,
  private tipsService: TipsService,private pagerService: PagerService,
  private workersService: WorkersService, private router:Router) {
console.log(this.user);
    this.loader = true;
    this.hotelForm = false;
    this.hotelService.getHotels()
      .then(data2 => {
        this.hotels = data2;
        console.log('hotelData',this.hotels); 
        this.setPage(1);
        this.loader = false;
      });

      this.tipsService.dashboard(this.user.hotel_id)
      .then((data2:any) => {
        this.tips = data2;
        this.loader = false;
      });

      this.tipsService.getAllTips()
        .then(data2 =>{
          this.tippers = data2;
          this.loader = false;
          console.log('Tippers',this.tippers);
          
              let total = 0;
              for (var i = 0; i < this.tippers.length; i++) {
                  if (this.tippers[i].amount) {
                      total += parseFloat(this.tippers[i].amount);
                      this.totalamount = total;
                  }
              }
              console.log('TOTAL', this.totalamount);
          
        });

      this.workersService.getAllWorkers()
        .then(data2 => {
          this.workers = data2;
          this.loader = false;
          console.log('workerdata',this.workers);
          for(let i=0; i < this.workers.length; i++){
            this.worker_count.push(this.workers[i].hotel_id);
          }
          console.log('workerdata',this.worker_count.sort());
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
        console.log(this.pager);
        console.log(this.pagedItems);
        console.log(this.tippers);

    }


  updateHotelStatus(hotelId,status){
    this.loader = true;
    this.hotelService.updateHotels(hotelId, status)
    .then(data =>{
      this.loader = false;
      });
  }

  view_hotel(hotel_id){
    if(hotel_id){
      this.v_data = this.user;
      this.v_data.user_type="worker";
      this.v_data.hotel_id=hotel_id;
      localStorage.setItem("admin", JSON.stringify(this.v_data));
      this.view_mode = true;
      localStorage.setItem("view_hotel", JSON.stringify(this.view_mode));
      this.router.navigate(['/home']);
      
      setTimeout(function(){ window.location.reload(); }, 100);
      //window.location.reload();
    }
  }




 selectId(value){
    if(this.hotelId.includes(value)){
      this.hotelId.splice(this.hotelId.indexOf(value),1);
    }else{
     this.hotelId.push(value); 
    }
     console.log('saalim',this.hotelId)
  }

  selectAllId(){
    console.log(this.isCheckedAll);
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
    console.log('saalim1',this.hotelId);
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
        });// close refresh
      })
    .catch(error =>{
        console.log(error);
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
    console.log('hotel',hotel)
    // this.hotelForm = false;
  }

  //add worker to allowed workers list for signup - need to put in real hotel_id here
  submitHotel() {
    this.loader = true;
    if(!this.hotelName || !this.hotelCity || !this.hotelAddress || !this.hotelZip || !this.hotelEmail){
      this.errorMessage = 'Please fill all the fields correctly';
      this.loader = false;       
    }
    else{
        this.hotelService.postHotel(this.hotelName, this.hotelCity, this.hotelAddress, this.hotelZip, this.hotelEmail)
          .then(data => {
            console.log("data",data);
          // refresh hotel list  
          this.hotelService.getHotels()
            .then(data2 => {
            this.hotels = data2;
            this.setPage(1);
              console.log(data2); 
              this.loader = false;       
            });// close refresh
            this.hotelForm = false;
            $('#addHotelModal').modal('hide');
            this.hotelName='';
            this.hotelCity='';
            this.hotelAddress='';
            this.hotelZip=''
            this.hotelEmail='';
          })
          .catch(error =>{
            console.log(error);
            this.errorMessage = 'Account with this email already exist';
            this.loader = false;  
            });}
  }

  downloadCSV(){
    var options = {
      showLabels: true
    };
     var hotels = this.hotels;
    for(var i=0; i < hotels.length; i++){
      hotels[i].number_of_employees = hotels[i].count;
      hotels[i].roles = hotels[i].departments;
      delete hotels[i].count;
      delete hotels[i].id;
      delete hotels[i].departments;
    }
    new Angular2Csv(hotels, 'Hotels', {headers: Object.keys(hotels[0])});
  }
};
