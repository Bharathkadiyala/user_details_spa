import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../model/userDetails';
import { UserService } from '../services/user.service'
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(public userService: UserService) { }
  
  ngOnInit(){
    this.userService.getAllUsers();
  }

  BindUserToForm(selectedUser:UserDetails){
    this.userService.userFormDetails.setValue({
      _id: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
      address: selectedUser.address,
      class: selectedUser.class,
      phonenumber: selectedUser.phonenumber,
      user_file: selectedUser.user_file
    })
  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.userService.deleteUser(_id).subscribe(res => {
        this.userService.getAllUsers();
      })
    }
  }
}
