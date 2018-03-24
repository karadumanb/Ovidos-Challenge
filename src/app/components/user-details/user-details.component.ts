import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  user: User = {
    first_name:"",
    last_name:"",
    avatar:"",
    id:null
  };
  users: User[] = [];
  constructor(public shared: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user.id = params['id'];
      this.shared.get("/api/users/" + this.user.id).subscribe(res => {
        this.user = res.data;
      }, err => {
        console.log(err);
      });
    });
    this.shared.getUsers().subscribe(res => {
      this.users = res.data;
     }, err => {
       console.log(err);
     });
  }

  deleteUser(user){
    this.shared.deleteUser(user.id).subscribe(res=> {
      console.log(res, "success");
    }, err => {
      console.log(err, "error");
    })
  }
  editUser(user) {
    this.shared.editingUser = user;
    $('.panel-edit input').each(function() {
          $(this).removeAttr('disabled');
    });
  }
}
