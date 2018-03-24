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
      if(this.newUser.name !== "" && this.newUser.job !== ""){
        this.newUser = {
          name: "",
          job: ""
        };
        this.shared.message("NEW USER REMOVED!", "alert-success", 3000);
      }
    }
  }

  postUser() {
    this.shared.createUser(this.newUser).subscribe(data => {
      console.log(data);
      this.newUser = {
        name: "",
        job: ""
      };
      this.shared.message("NEW HAS BEEN SUCCESSFULLY ADDED. CHECK THE CONSOLE FOR THE RESPONSE!", "alert-success", 5000);
    }, err => {
      console.log(err);
      this.shared.message("NEW HAS NOT BEEN ADDED. CHECK THE CONSOLE FOR THE ERROR!", "alert-danger", 5000);
    })
  }

  editUser() {
    if(this.shared.editingOn) {
      this.shared.editUser(this.shared.editingUser).subscribe(res => {
        console.log(res)
        this.shared.message("UPDATE HAS BEEN SUCCESSFUL. CHECK THE CONSOLE FOR THE RESPONSE!", "alert-success", 5000);
      }, err => {
        console.error(err)
        this.shared.message("UPDATE HAS NOT BEEN SUCCESSFUL. CHECK THE CONSOLE FOR THE ERROR!", "alert-danger", 5000);
      })
      this.disableInput();
    } else {
      this.shared.message("YOU HAVE TO SELECT A USER TO UPDATE!", "alert-danger", 3000);
    }
  }

  deleteEditingUser() {
    if(this.shared.editingOn) {
      if(confirm("Are you sure to delete the user being edited?")) {
        this.disableInput();
        this.shared.message("USER DELETED!", "alert-success", 3000);   
      }
    }  else {
      this.shared.message("YOU HAVE TO SELECT A USER, THEN YOU CAN REMOVE IT!", "alert-danger", 3000);
    }
  }

  disableInput() {
    $('.panel-edit input').each(function() {
      $(this).attr({
          'disabled': 'disabled'
      });
    });
    this.shared.editingOn = false;
    this.shared.editingUser = {
      first_name : "",
      last_name: "",
      avatar: "",
      id: null
    } 
  }
}
