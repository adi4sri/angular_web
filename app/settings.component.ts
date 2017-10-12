import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';
import { HotelsService } from './providers/hotels.service';
import { Router } from "@angular/router";
declare var $: any;
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
	dept_success:any;
	user_type:any;
	login_type:any;
	newRole:any;
	role_success:any;
	errorRole:any;
	loader:boolean = false;
	dept_loader:boolean = false;
	role_loader:boolean = false;
	bankInfo:any;
	bank_success:boolean = false;
	bank_remove_success:boolean = false;
	errorMessage:any;
	errorMessage2:any;
	errors:any = [{
		message:''
	}];
	show_bank_update:boolean = false;
	show_set_default:boolean = false;
	name:any;
	routingNumber:any;
	accountNumber:any;
	bankAccountType:any;
	bankDetails:any;
	constructor(private auth: Auth, 
	private http: Http,
	private authHttp: AuthHttp,
	private workersService: WorkersService,
	private hotelsService: HotelsService,
	private router:Router){
		console.log(this.user);
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
				console.log(data);
				
				if(data && data['funding-sources']){
					this.bankInfo = data['funding-sources'];
					/*this.bankInfo.bankAccountType = data['funding-sources'][0].bankAccountType;
					this.bankInfo.bankName = data['funding-sources'][0].bankName;*/
				}
				})
			.catch(error=>{
				console.log(error);
				});
	}

	getBankInfo(){
		this.workersService.getBankInfo(this.user.id)
			.then(data =>{
				if(data && data['funding-sources']){
					this.bankInfo = data['funding-sources'];
				}
				console.log(this.bankInfo);
				})
			.catch(error=>{
				console.log(error);
				});	
	}

	submitBankInfo(){
		this.loader = true;
		if(!this.name || !this.routingNumber || !this.accountNumber || !this.bankAccountType){
			this.errorMessage2 = 'Please fill all the fields!';
			this.loader = false;
		}else{
			this.errorMessage = '';

			this.workersService.bankInfo(this.user.id, this.routingNumber, this.accountNumber, this.bankAccountType, this.name, this.user.hotel_slug)
				.then((data:any)=>{
					console.log(data);
					this.workersService.getBankInfo(this.user.id)
					.then((data1:any) =>{
						console.log(data1);
						if(data1 && data1['funding-sources'] && data1['funding-sources'].length==1){
							this.user.default_funding_source = data.body.id;
							localStorage.setItem("admin", JSON.stringify(this.user));
							this.getBankInfo();
						}
						})
					.catch((error1:any)=>{
						console.log(error1);
						});
					$('#add_bank').modal('hide');
					this.name = '';
					this.routingNumber = '';
					this.accountNumber = '';
					this.bankAccountType = '';
					this.loader = false;
					})
				.catch((error:any)=>{
					this.errorMessage = JSON.parse(error._body);
					this.errorMessage = (JSON.parse(this.errorMessage.message));
					console.log(this.errorMessage);
					if(this.errorMessage && this.errorMessage.message && this.errorMessage._embedded && this.errorMessage._embedded.errors){
						this.errors = this.errorMessage._embedded.errors;
						this.loader = false;
					}
					this.loader = false;
					});
		}
	}

	showBankUpdate(bank:any){
		console.log(bank);
		this.bankDetails=bank;
		this.show_bank_update= true;
	}

	showSetDefault(bank:any){
		console.log(bank);
		this.bankDetails=bank;
		this.show_set_default= true;
	}


	updateBank(){

		this.loader = true;
		this.workersService.updateBankInfo(this.user.id, this.bankDetails.bankAccountType, this.bankDetails.name, this.bankDetails.id)
			.then((data:any)=>{
				console.log(data);
				this.show_bank_update = false;
				this.loader = false;
				this.bank_success = true;
				$('#update_bank').modal('hide');
				setTimeout(function(){
		            document.getElementById("bank_success").style.display = 'none';
		          },3000);
			})
			.catch((error:any)=>{
				console.log(error);
			})
	}

	deleteBank(){
		this.loader = true;
		this.workersService.deleteBankInfo(this.user.id, this.bankDetails.id)
			.then((data:any)=>{
				console.log(data);
				this.workersService.getBankInfo(this.user.id)
				.then(data =>{
					let bank_id = JSON.parse(localStorage.getItem('admin'));
					if(this.bankDetails.id == bank_id.default_funding_source){
						bank_id.default_funding_source = '';
						this.user.default_funding_source = '';
						bank_id = JSON.stringify(bank_id);
						localStorage.setItem('admin', bank_id);
					}
					this.loader = false;
					$('#update_bank').modal('hide');
					if(data && data['funding-sources']){
						this.bankInfo = data['funding-sources'];
						this.bank_remove_success = true;
						setTimeout(function(){
				            document.getElementById("bank_remove_success").style.display = 'none';
				          },3000);
							if(!data['funding-sources'][0] && this.user.login_type=='1'){
								//alert('You don\'t have a bank account linked with bTIPt. Please add bank to make transactions')
								this.router.navigate(["/bank-info"]);
								setTimeout(function(){
									window.location.reload();
								},100);
							}
					}
					})
				.catch(error=>{
					console.log(error);
					this.loader = false;
					});
			})
			.catch((error:any)=>{
				console.log(error);
				this.loader = false;

			})
	}

	setDefaultBank(){
		this.loader = true;
		this.workersService.setDefaultBank(this.user.id, this.bankDetails.id)
			.then((data:any)=>{
				console.log(data);
				this.getBankInfo();
				this.user.default_funding_source = this.bankDetails.id;
				localStorage.setItem("admin", JSON.stringify(this.user));
				this.show_set_default= false;
				$('#set_default_bank').modal('hide');

				this.loader = false;
			})
			.catch((error:any)=>{
				console.log(error);
			})
	}

	updateRoles(){
		this.loader = true;
		this.user_type = this.user.user_type;
		console.log(this.user_type);
		//this.login_type = this.user.login_type;
		this.workersService.workerRoles(this.role.dashboard, this.role.worker_employees, this.role.tip_comparison, this.role.tip_employee, this.role.reviews, this.user_type, '1', this.user.hotel_id)
			.then(data=>{
				console.log(this.role.login_type);
					this.role_success = 'Roles updated successfully';
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
				this.dept_success= 'Departments Updated';
				document.getElementById("dept_success").style.display = '';
				this.dept_loader = false;
				setTimeout(function(){
					this.dept_success= '';
	           		document.getElementById("dept_success").style.display = 'none';
          		},3000);
			})
			.catch(error=>{
				this.errorMessage = JSON.parse(error._body);
				console.log(this.errorMessage.message);
				this.dept_loader = false;
			});
	}
};