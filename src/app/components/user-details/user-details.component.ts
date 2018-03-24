import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { User } from '../../models/User';
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
  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.shared.get("/api/users/2").subscribe(res => {
      this.user = res.data;
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
