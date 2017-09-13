import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import { HotelsService } from './providers/hotels.service';

@Component({
  selector: 'settings',
  templateUrl: 'app/settings.component.html',
  providers: [Auth, WorkersService, HotelsService]
  
})

export class SettingsComponent { 
user = JSON.parse(localStorage.getItem('admin')); 
role = JSON.parse(localStorage.getItem('user_roles2')); 
view_hotel_mode = JSON.parse(localStorage.getItem('view_hotel')); 
	id:any;
	current_pass:any;
	new_pass:string;
	renew_pass:string;
	compare_pass:Boolean=true;
	erroMessage:any;
	worker:any;
	departments:any[]=[];
	dept_name:any[]=[];
	success:any;
	user_type:any;
	login_type:any;
	newRole:any;
	role_success:any;
	errorRole:any;
	loader:boolean = false;
	dept_loader:boolean = false;
	role_loader:boolean = false;
	bankInfo:any;
	errorMessage:any;
	constructor(private auth: Auth, 
	private http: Http,
	private authHttp: AuthHttp,
	private workersService: WorkersService,
	private hotelsService: HotelsService){
		this.loader = true;
		this.id= this.user.id;
		this.worker=[];
		this.workersService.workerDetails(this.id)
			.then(data =>{
				this.worker = data[0];
				this.departments = this.worker.hotel_department;
				if(this.departments == null){
					this.departments = [""];
				}
				console.log('Dept',this.departments);	
				this.loader = false;			
				})
			.catch(error=>{
				
				});
		/*this.user_type = this.user.user_roles.user_type;
		this.workersService.getRoles(this.user_type)
			.then(data=>{
				this.role = data[0];
				localStorage.setItem("roles",JSON.stringify(data[0]));
				this.roles=JSON.parse(localStorage.getItem('roles'));
				console.log('Roles',this.roles);
				})
			.catch(error=>{
				console.log(error);
				});*/
		
		this.workersService.getBankInfo(this.user.id)
			.then(data =>{
				if(data && data['funding-sources'][0].bankName){
					this.bankInfo = data['funding-sources'][0].bankName;
				}
				console.log(this.bankInfo);
				})
			.catch(error=>{
				console.log(error);
				});
	}

	getBankInfo(){
		this.workersService.getBankInfo(this.user.id)
			.then(data =>{
				if(data && data['funding-sources'][0].bankName){
					this.bankInfo = data['funding-sources'][0].bankName;
				}
				console.log(this.bankInfo);
				})
			.catch(error=>{
				console.log(error);
				});	
	}

	updateRoles(){
		this.loader = true;
		this.user_type = this.user.user_type;
		//this.login_type = this.user.login_type;
		this.workersService.workerRoles(this.role.dashboard, this.role.worker_employees, this.role.tip_comparison, this.role.tip_employee, this.role.reviews, this.user_type, this.role.login_type)
			.then(data=>{
					this.role_success = 'Roles updated successfully';
					console.log(this.role_success);
					this.loader = false;
				})
			.catch(error=>{
					this.errorRole = JSON.parse(error._body);
					this.loader = false;
				});
		
		this.newRole = {};
		this.newRole.dashboard = this.role.dashboard;
		this.newRole.worker_employees = this.role.worker_employees;
		this.newRole.tip_comparison = this.role.tip_comparison;
		this.newRole.tip_employee = this.role.tip_employee;
		this.newRole.reviews = this.role.reviews;
		this.newRole.user_type = this.user_type;
		this.newRole.setting = true;
		console.log('SASAS', this.newRole);
		console.log('old', this.role);

		localStorage.setItem("user_roles2",JSON.stringify(this.newRole));
		this.role = JSON.parse(localStorage.getItem('user_roles2'));
	}

	

	updatePassword(){
		this.loader = true;
		this.id= this.user.id;

		if(this.new_pass == this.renew_pass){
			this.compare_pass = true;
			this.workersService.updateWorkerPassword(this.id, this.current_pass, this.renew_pass)
				.then(data=>{
					console.log('Password Changed');
						this.success=true;
						this.current_pass='';
						this.new_pass='';
						this.renew_pass='';
						this.loader = false;
					})
				.catch(error=>{
					this.errorMessage = JSON.parse(error._body);
					console.log(this.errorMessage.message);
					this.loader = false;
					});
		}
		else{
				this.compare_pass = false;
				this.loader = false;
				console.log('Passwords should be matched!');
		}
	}

	trackByFn(index: any, item: any) {
	   return index;
	}

	addNewDept(){
		
			this.departments.push('');
			console.log(this.departments);
	}

	removeDept(index){
		this.departments.splice(index,1);
		console.log(this.departments);
	}

	addDepartments(){
		this.id= this.user.hotel_id;
		this.dept_loader = true;
		this.hotelsService.addDepartments(this.id, this.departments)
			.then(data =>{
				console.log('Department Added');
				this.success= 'Departments Updated';
				this.dept_loader = false;
			})
			.catch(error=>{
				this.errorMessage = JSON.parse(error._body);
				console.log(this.errorMessage.message);
				this.dept_loader = false;
			});
	}
};