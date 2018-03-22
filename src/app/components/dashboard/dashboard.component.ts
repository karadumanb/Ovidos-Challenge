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

  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.shared.getUsers().subscribe(data => {
      console.log(data)
    });
  }

  postUser() {
    console.log("here");
    this.shared.createUser(this.myUser).subscribe(data => {
      console.log(data);
    })
  }

}
