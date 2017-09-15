import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { WorkersService } from './providers/workers.service';
import { Angular2Csv }  from 'angular2-csv';
@Component({
  selector: 'home',
  templateUrl: 'app/feedback.template.html'  
})
export class FeedbackComponent {
  user = JSON.parse(localStorage.getItem('admin'));
  reviews:any;
  count:any;
  average:any;
  csv:any;
  is_review:boolean = false;
  barChartData:any;
  constructor(private auth: Auth, private workersService:WorkersService) {
    this.workersService.getReviewsGraph(this.user.hotel_id)
      .then(data =>{
        this.barChartData= [
          {data: data}
        ];
        console.log(this.barChartData);
        
        })
      .catch(error =>{
          console.log(error);
        });

    this.workersService.getReviews(this.user.hotel_id)
      .then(data=>{
        this.reviews = data;
        if(this.reviews && this.reviews[0]){
          this.is_review = false;
        }else if(this.reviews.message){
          this.is_review = true;
        }
        console.log('REVIEWS',this.reviews);
        })
      .catch(error=>{
        console.log(error);
        });

    this.workersService.getCountReviews(this.user.hotel_id)
      .then(data=>{
        this.count = parseInt(data[0].count);
        this.average = parseInt(data[0].avg);
        })
      .catch(error=>{
        console.log(error);
        });
  }
downloadCSV(){
    var options = {
      showLabels: true
    };
    this.csv = this.reviews;
    new Angular2Csv(this.csv, 'Reviews',options);
  }
    // barChart
  /*public barChartDataTable:Array<any> = [
    {data: this.barChartData}
  ];*/
  public barChartLabels:Array<any> = ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];
  public barChartOptions:any = {
    responsive: true,
    color:'#ffffff'
    };
  public barChartColors:Array<any> = [
    { // grey
      backgroundColor: '#85bb65',
      borderColor: 'blue',
      pointBackgroundColor: 'blue',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'purple',
      pointBackgroundColor: 'purple',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public barChartLegend:boolean = false;
  public barChartType:string = 'horizontalBar';
 

  // events
  public chartClicked(e:any):void {
    console.log(e);

    
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  // close bar chart

};
