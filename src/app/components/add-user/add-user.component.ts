import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { SharedService } from '../../services/shared.service';

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
}
