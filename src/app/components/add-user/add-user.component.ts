import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { SharedService } from '../../services/shared.service';
declare var $ :any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  public newUser: any = {
    name: "",
    job: ""
  };
  constructor(public shared: SharedService) { }

  ngOnInit() {
  }

  deleteUser() {
    if(confirm("Are you sure to delete new user infos?")){
      this.newUser = {
        name: "",
        job: ""
      };
    }
  }

  postUser() {
    this.shared.createUser(this.newUser).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  editUser() {
    this.shared.editUser(this.shared.editingUser).subscribe(res => {
      console.log('Update Succesful')
    }, err => {
      console.error('Update Unsuccesful')
    })
    this.disableInput();
  }

  deleteEditingUser() {
    if(confirm("Are you sure to delete the user being edited?")) {
      this.disableInput();   
    }
  }

  disableInput() {
    $('.panel-edit input').each(function() {
      $(this).attr({
          'disabled': 'disabled'
      });
    });
    this.shared.editingUser = {
      first_name : "",
      last_name: "",
      avatar: "",
      id: null
    } 
  }
}
