import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public shared: SharedService,
        public auth: AuthService
    ) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
          this.shared.isLoggedin = false;
          this.router.navigate(['login']);
          return false;
        }
        this.shared.isLoggedin = true;
        return true;
    }
}