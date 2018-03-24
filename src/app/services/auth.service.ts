import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public shared: SharedService, public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    if(token === undefined || token === null){
      return false;
    }
    // Check whether the token is expired and return
    // true or false
    //normalde alttaki command'i kullanmamız lazım ancak jwt reqres.in'in token'ını onaylamıyor.
    //return !this.jwtHelper.isTokenExpired(token);
    return (token.length > 0);
  }

  login(email: string, password: string) {
    let user = {
      email: email,
      password: password
    }
    return this.shared.post('/api/login', user);
  }

}
