import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  myUser: any = {
    "name": "baturay",
    "job": "developer"
  }
  users: User[] = [];

  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.shared.getUsers().subscribe(res => {
     this.users = res.data;
    }, err => {
      console.log(err);
    });
  }

  deleteUser(user){
    this.shared.deleteUser(user.id).subscribe(res=> {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  editUser(user) {
    this.shared.editingUser = user;
  }

}
