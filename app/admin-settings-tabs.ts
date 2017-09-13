import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';
import { WorkersService } from './providers/workers.service';

@Component({
  selector: 'admin-settings-tabs',
  templateUrl: 'app/admin-settings-tabs.html',
  providers: [WorkersService]
})

export class AdminSettingsTabs {
	user = JSON.parse(localStorage.getItem('admin')); 
	role = JSON.parse(localStorage.getItem('user_roles2')); 
	id:any;
	current_pass:any;
	new_pass:String;
	renew_pass:String;
	compare_pass:Boolean=true;
	erroMessage:any;
	success:any;
	role_success:any;
	user_type:any;
	login_type:any;
	location:Boolean;
	tippers:Boolean;
	employees:Boolean;
	setting:Boolean;
	loader:boolean = false;
	errorMessage:any;
	roles:any;
	newRole:any;
	constructor( private auth:Auth, private http:Http, private authHttp:AuthHttp, 
		private workersService:WorkersService){
		/*this.user_type = this.role.user_type;
		this.workersService.getRoles(this.user_type)
			.then(data=>{
				this.roles = data[0];
				localStorage.setItem("roles",JSON.stringify(data[0]));
				//this.roles=JSON.parse(localStorage.getItem('roles'));
				console.log('Roles',this.roles);
				})
			.catch(error=>{
				console.log(error);
				});*/

	}

	updateRoles(){
		this.loader = true;
		this.user_type = this.user.user_type;
		//this.login_type = this.user.user_roles.login_type;
		this.workersService.adminRoles(this.role.location, this.role.admin_employees, this.role.tip_center, this.role.setting, this.user_type, this.role.login_type)
			.then(data=>{
				this.loader = false;
				this.role_success = 'Roles has been updated successfully!';
				})
			.catch(error=>{
				this.loader = false;
				});
		
		this.newRole = {};
		this.newRole.location = this.role.location;
		this.newRole.admin_employees = this.role.admin_employees;
		this.newRole.tip_center = this.role.tip_center;
		this.newRole.setting = this.role.setting;
		this.newRole.user_type = this.user_type;
		this.newRole.login_type = this.role.login_type;
		console.log('NewRole', this.newRole);
		console.log('OldRole', this.role);
		console.log('UserType', this.user_type);
		console.log('LoginType', this.role.login_type);

		
		
		localStorage.setItem("user_roles2",JSON.stringify(this.newRole));
		this.role = JSON.parse(localStorage.getItem('user_roles2')); 
	}

	updatePassword(){
		
		this.id= this.user.id;
		this.loader = true;
		if(this.new_pass == this.renew_pass){
			this.compare_pass = true;
			this.workersService.updateAdminPassword(this.id, this.current_pass, this.renew_pass)
				.then(data=>{
					this.success = 'Password has been updated successfully!';
					this.loader = false;
						this.current_pass='';
						this.new_pass='';
						this.renew_pass='';
					})
				.catch(error=>{
					this.errorMessage = JSON.parse(error._body);
					this.loader = false;
					console.log(this.errorMessage.message);
					});
		}
		else{
				this.compare_pass = false;
				this.loader = false;
				console.log('Passwords should be matched!');
		}
	}
};
