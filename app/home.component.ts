import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { HotelsService } from './providers/hotels.service';
import { TipsService } from './providers/tips.service';
import { WorkersService } from './providers/workers.service';
import { Router } from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: 'app/home.template.html',
  providers: [TipsService,Auth]
})

export class HomeComponent {
  user:any= JSON.parse(localStorage.getItem('admin'));
  
  //tips: any;
  tips: { avg:any, employees:any, total:any, total_tips:any, __proto__:any  };
  show: Boolean;
  tipData:any;
  houseData:any[]=[];
  bellhops:any[]=[];
  concierge:any[]=[];
  hotelData:any;
  count_emp:any;
  total:any;
  chart_data:any;
  weeks:any;
  week_data:any;
  years:any;
  year_data:any;
  days:any;
  day_data:any;
  lineChartMonthlyData:any[]=[];
  lineChartWeeklyData:any[]=[];
  lineChartWeeklyLabels:any[]=[];
  lineChartYearlyData:any[]=[];
  lineChartYearlyLabels:any[]=[];
  lineChartDailyData:any[]=[];
  lineChartDailyLabels:any[]=[];
  loader:Boolean = false;
  loading:String = 'Loading...';
  topped_emp:any;
  reviews:any;
  period:any;
  review_period:any;
  is_review:boolean = false;
  firstline:any;
  noDeptError:any;

  constructor(private auth: Auth, private tipsService: TipsService, private hotelsService: HotelsService, private workersService: WorkersService, private router: Router) {
  if(this.user && this.user.user_type == 'admin'){
   this.router.navigate(['/hotels']) ;
  }

  console.log(this.user);

     this.loader = true;
    this.tipsService.top_tipped_emp(this.user.hotel_id)
          .then((data:any) =>{
            this.topped_emp = data;
            if(this.topped_emp && this.topped_emp[0]){
            switch (this.topped_emp[0].month){
              case 1: this.period = 'Jan'; break;
              case 2: this.period = 'Feb'; break;
              case 3: this.period = 'Mar'; break;
              case 4: this.period = 'Apr'; break;
              case 5: this.period = 'May'; break;
              case 6: this.period = 'Jun'; break;
              case 7: this.period = 'Jul'; break;
              case 8: this.period = 'Aug'; break;
              case 9: this.period = 'Sep'; break;
              case 10: this.period = 'Oct'; break;
              case 11: this.period = 'Nov'; break;
              case 12: this.period = 'Dec'; break;
              default: this.period = 'this month'; break;
            }
            }else{
              this.period = 'this month';
            }
            this.loader = false;

            })
          .catch(error=>{
            console.log(error);
            });
    
    this.workersService.getMonthlyReviews(this.user.hotel_id)
          .then((data:any)=>{
            this.reviews = data;
            if(this.reviews && this.reviews.message){
              this.review_period = 'this month';
              this.is_review = true;
            }else{
                this.is_review = false;
            }
            
            if(this.reviews && this.reviews[0]){
              switch (this.reviews[0].month){
                  case 1: this.review_period = 'Jan'; break;
                  case 2: this.review_period = 'Feb'; break;
                  case 3: this.review_period = 'Mar'; break;
                  case 4: this.review_period = 'Apr'; break;
                  case 5: this.review_period = 'May'; break;
                  case 6: this.review_period = 'Jun'; break;
                  case 7: this.review_period = 'Jul'; break;
                  case 8: this.review_period = 'Aug'; break;
                  case 9: this.review_period = 'Sep'; break;
                  case 10: this.review_period = 'Oct'; break;
                  case 11: this.review_period = 'Nov'; break;
                  case 12: this.review_period = 'Dec'; break;
                  default: this.review_period = 'this month'; break;
                }
              }
              else{
                this.review_period = 'this month';
              }
            })
          .catch(error=>{
            console.log(error);
            });

    //houseData=[];

    
    this.tipsService.chart()
      .then(data =>{
        this.tipData = data;
        });

  if(this.user.login_type == '0'){
    this.tipsService.dashboard(this.user.hotel_id)
      .then((data2:any) => {
      this.tips = data2;
        this.show = true;
      });
      
      this.tipsService.monthly_chart_data(this.user.hotel_id)
        .then(data1 =>{
          this.chart_data = data1;
          for (let key in this.chart_data){
            var data2={
              data:this.chart_data[key],
              label:key,
              tension:0
            };
            this.lineChartMonthlyData.push(data2);
            
          }
          })
        .catch(error=>{
          console.log(error);
          });

        this.tipsService.weekly_chart_data(this.user.hotel_id)
        .then(data1 =>{
            this.weeks=[];
          this.week_data = data1;
          for (let key in this.week_data){
            var data2={
              data:this.week_data[key],
              label:key,
              tension:0
            }

            this.lineChartWeeklyData.push(data2);
          }
         for(let j = 0; j<=6; j++){
           switch(j){
             case 0: this.weeks.push('Sunday'); break;
             case 1: this.weeks.push('Monday'); break;
             case 2: this.weeks.push('Tuesday'); break;
             case 3: this.weeks.push('Wednesday'); break;
             case 4: this.weeks.push('Thurday'); break;
             case 5: this.weeks.push('Friday'); break;
             case 6: this.weeks.push('Saturday'); break;
           }
         }
            this.lineChartWeeklyLabels = this.weeks;
          })
        .catch(error=>{
          console.log(error);
          });

         this.tipsService.yearly_chart_data(this.user.hotel_id)
        .then(data1 =>{
            this.years=[];
          this.year_data = data1;
          for (let key in this.year_data){
            var data2={
              data:this.year_data[key],
              label:key,
              tension:0
            }

            this.lineChartYearlyData.push(data2);
          }
          var d = new Date();
          var n = d.getFullYear();
         for(let j = 2012; j<=n; j++){this.years.push(j);}
            this.lineChartYearlyLabels = this.years;
         })
        .catch(error=>{
          console.log(error);
          });

        this.tipsService.daily_chart_data(this.user.hotel_id)
        .then(data1 =>{
            this.days=[];
          this.day_data = data1;
          for (let key in this.day_data){
            var data2={
              data:this.day_data[key],
              label:key,
              tension:0
            }

            this.lineChartDailyData.push(data2);
          }
            this.lineChartDailyLabels = ['Today'];
         })
        .catch(error=>{
          console.log(error);
          });
      }

  if(this.user.login_type == '1'){
      this.tipsService.workerTipsComparison(this.user.id)
        .then((data:any)=>{
          this.show = true;
          this.tips = data;

        })
        .catch((error:any)=>{
          console.log(error);
        });
      this.tipsService.emp_monthly_chart(this.user.id)
            .then((data:any)=>{
              this.chart_data = data;
              for (let key in this.chart_data){
                var data2={
                  data:this.chart_data[key],
                  label:key,
                  tension:0
                };
                this.lineChartMonthlyData.push(data2);
                
              }
            })
            .catch((error:any)=>{
              console.log(error);
            });

      this.tipsService.emp_weekly_chart(this.user.id)
        .then(data1 =>{
            this.weeks=[];
          this.week_data = data1;
          for (let key in this.week_data){
            var data2={
              data:this.week_data[key],
              label:key,
              tension:0
            }

            this.lineChartWeeklyData.push(data2);
          }
         for(let j = 0; j<=6; j++){
           switch(j){
             case 0: this.weeks.push('Sunday'); break;
             case 1: this.weeks.push('Monday'); break;
             case 2: this.weeks.push('Tuesday'); break;
             case 3: this.weeks.push('Wednesday'); break;
             case 4: this.weeks.push('Thurday'); break;
             case 5: this.weeks.push('Friday'); break;
             case 6: this.weeks.push('Saturday'); break;
           }
         }
            this.lineChartWeeklyLabels = this.weeks;
          })
        .catch(error=>{
          console.log(error);
          });

        this.tipsService.emp_yearly_chart(this.user.id)
        .then(data1 =>{
            this.years=[];
          this.year_data = data1;
          for (let key in this.year_data){
            var data2={
              data:this.year_data[key],
              label:key,
              tension:0
            }

            this.lineChartYearlyData.push(data2);
          }

          var d = new Date();
          var n = d.getFullYear();
         for(let j = 2012; j<=n; j++){this.years.push(j);}
            this.lineChartYearlyLabels = this.years;
         })
        .catch(error=>{
          console.log(error);
          });
        
        this.tipsService.emp_daily_chart(this.user.id)
        .then(data1 =>{
            this.days=[];
          this.day_data = data1;
          for (let key in this.day_data){
            var data2={
              data:this.day_data[key],
              label:key,
              tension:0
            }

            this.lineChartDailyData.push(data2);
          }
            this.lineChartDailyLabels = ['Today'];
         })
        .catch(error=>{
          console.log(error);
          });

   }

}

  top_review_daily(){
  this.loader = true;
  this.workersService.getDailyReviews(this.user.hotel_id)
          .then((data:any) =>{
            if(data && data.message){
             this.review_period = 'this day';
              this.is_review = true;
            }else{
              this.is_review = false;
              this.reviews = data;
            }
             this.review_period = 'this day';
             this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }

  top_review_weekly(){
  this.loader = true;
  this.workersService.getWeeklyReviews(this.user.hotel_id)
          .then((data:any) =>{
            this.reviews = data;
            if(this.reviews  && this.reviews .message){
              this.is_review = true;
              this.review_period = 'this week';
            }else{
              this.is_review = false;
            }
            this.review_period = 'this week';
            this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }

  top_review_monthly(){
  this.loader = true;
  this.workersService.getMonthlyReviews(this.user.hotel_id)
          .then((data:any)=>{
            this.reviews = data;
            if(this.reviews && this.reviews.message){
              this.review_period = 'this month';
              this.is_review = true;
            }else{
                this.is_review = false;
            }
            
            if(this.reviews && this.reviews[0]){
              switch (this.reviews[0].month){
                  case 1: this.review_period = 'Jan'; break;
                  case 2: this.review_period = 'Feb'; break;
                  case 3: this.review_period = 'Mar'; break;
                  case 4: this.review_period = 'Apr'; break;
                  case 5: this.review_period = 'May'; break;
                  case 6: this.review_period = 'Jun'; break;
                  case 7: this.review_period = 'Jul'; break;
                  case 8: this.review_period = 'Aug'; break;
                  case 9: this.review_period = 'Sep'; break;
                  case 10: this.review_period = 'Oct'; break;
                  case 11: this.review_period = 'Nov'; break;
                  case 12: this.review_period = 'Dec'; break;
                  default: this.review_period = 'this month'; break;
                }
              }
              else{
                this.review_period = 'this month';
              }
              this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            this.loader = false;
            });
    }

  top_review_yearly(){
  this.loader = true;
  this.workersService.getYearlyReviews(this.user.hotel_id)
          .then((data:any) =>{
              this.reviews = data;
            if(data && data.message){
              this.review_period = 'this year';
              this.is_review = true;
            }else{
              if(this.reviews && this.reviews[0]){
                  this.review_period = this.reviews[0].year;
              }else{
                this.review_period = 'this year';
              }
            }
            this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }

  top_tipped_yearly(){
  this.loader = true;
  this.tipsService.yearly_top_tipped(this.user.hotel_id)
          .then(data =>{
            this.topped_emp = data;
            this.period = '';
            if(this.topped_emp && this.topped_emp[0])
            {
              this.period = this.topped_emp[0].year;
            }else{
              this.period = 'this year';
            }
            this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }



  top_tipped_monthly(){
    this.loader = true;
    this.tipsService.top_tipped_emp(this.user.hotel_id)
          .then(data =>{
            this.topped_emp = data;
            if(this.topped_emp && this.topped_emp[0]){
            switch (this.topped_emp[0].month){
              case 1: this.period = 'Jan'; break;
              case 2: this.period = 'Feb'; break;
              case 3: this.period = 'Mar'; break;
              case 4: this.period = 'Apr'; break;
              case 5: this.period = 'May'; break;
              case 6: this.period = 'Jun'; break;
              case 7: this.period = 'Jul'; break;
              case 8: this.period = 'Aug'; break;
              case 9: this.period = 'Sep'; break;
              case 10: this.period = 'Oct'; break;
              case 11: this.period = 'Nov'; break;
              case 12: this.period = 'Dec'; break;
              default: this.period = 'this month'; break;
            }
           }
           else{
            this.period = 'this month';
           }
            this.loader = false;

            })
          .catch(error=>{
            console.log(error);
            });
  }

  top_tipped_weekly(){
  this.loader = true;
  this.tipsService.weekly_top_tipped(this.user.hotel_id)
          .then(data =>{
            this.topped_emp = data;
            this.period = 'this week';
            this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }


  top_tipped_daily(){
  this.loader = true;
  this.tipsService.daily_top_tipped(this.user.hotel_id)
          .then(data =>{
            this.topped_emp = data;
            this.period = 'this day';
            this.loader = false;
            })
          .catch(error=>{
            console.log(error);
            });
  }


 public lineChartMonthlyLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 //public lineChartWeeklyLabels:Array<any> = this.weeks;
 
 public lineChartMonthlyOptions:any = {
    responsive: true,
    legend: {
    position: 'bottom',
    labels:{
        usePointStyle: true,
      }
    }
  };

  public lineChartWeeklyOptions:any = {
    responsive: true,
    legend: {
    position: 'bottom',
    labels:{
        usePointStyle: true,
      }
    }
  };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
    position: 'bottom',
    labels:{
        usePointStyle: true,
      }
    }
  };

  public barChartDailyColors:Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#65b4ff',
      pointBackgroundColor: 'transparent',
      pointBorderColor: '#65b4ff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth:3

    },
    { // dark grey
      backgroundColor: 'transparent',
      borderColor: '#ac00ff',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      borderWidth:3
    },
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#a4a2a0',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      borderWidth:3
    }
  ];

  public lineChartMonthlyColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#65b4ff',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#ac00ff',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#a4a2a0',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartMonthlyLegend:boolean = true;
  public lineChartMonthlyType:String = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  // close line chart

};
