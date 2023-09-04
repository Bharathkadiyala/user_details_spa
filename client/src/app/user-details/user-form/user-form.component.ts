import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from '../../model/userDetails'
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  submitted: boolean = false;
  formdata:any;
  constructor(public userService: UserService) { }

  onSubmit() {
    this.submitted = true;
    if (this.userService.userFormDetails.valid) {
          this.formdata=this.appendData();
      if (this.userService.userFormDetails.get('_id')?.value == '')
        this.userService.createUser(this.formdata).subscribe(data => {
          console.log(data);
          this.userService.getAllUsers();
          this.resetForm();
        },(error)=>{
          console.log(error)
        })
      else
      this.formdata=this.appendData();
        this.userService.updateUser(this.formdata).subscribe(res => {
          this.userService.getAllUsers();
          this.resetForm();
        })
    }
  }

  resetForm() {
    this.userService.userFormDetails.reset();
    this.file=[]
    let control: AbstractControl = null;
    this.userService.userFormDetails.markAsUntouched();
    Object.keys( this.userService.userFormDetails.controls).forEach((name) => {
      control =  this.userService.userFormDetails.controls[name];
      control.setErrors(null);
    });
    this.submitted = false;
  }
  file: any;

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
 
  appendData(){
    const formData = new FormData();
    formData.append('user_file', this.file);
    formData.append('name', this.userService.userFormDetails.value.name);
    formData.append('email', this.userService.userFormDetails.value.email);
    formData.append('address', this.userService.userFormDetails.value.address);
    formData.append('class', this.userService.userFormDetails.value.class);
    formData.append('phonenumber', this.userService.userFormDetails.value.phonenumber);
    return formData;
  }
}
