import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/User';
declare var $ :any;

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
      console.log(res, "success");
      this.shared.message("THE USER HAS BEEN REMOVED!", "alert-success", 4000);
    }, err => {
      console.log(err, "error");
      this.shared.message("THE USER COULD NOT BE REMOVED!", "alert-danger", 4000);
    })
  }

  editUser(user) {
    this.shared.editingUser = user;
    this.shared.editingOn = true;
    $('.panel-edit input').each(function() {
          $(this).removeAttr('disabled');
    });
  }

}
