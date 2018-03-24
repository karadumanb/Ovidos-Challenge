import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router, public shared: SharedService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.email, this.password);
    if(this.email === "baturay@karaduman" && this.password === "1234"){
      this.authService.login(this.email, this.password).subscribe(res=>{
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.token));
        this.shared.message("You are now logged in", "alert-success", 4000);
        this.router.navigate(['/']);
      }, err => {
        this.shared.message("Could not get token", "alert-danger", 4000);
        console.log(err);
      });
    } else {
      this.shared.message("Password or email is not valid check the console for valid email and password", "alert-danger", 5000);
      console.log("valid email: baturay@karaduman   valid password: 1234");
    }
  }

}
