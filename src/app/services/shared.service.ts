import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var $ :any;

@Injectable()
export class SharedService {
  apiUrl = 'https://reqres.in';
  editingUser: User = {
    first_name : "",
    last_name: "",
    avatar: "",
    id: null
  }
  editingOn: boolean = false;
  isLoggedin: boolean = false;

  constructor(private http: HttpClient, private flashMessage: FlashMessagesService) { }

  get(endpoint): Observable<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + endpoint, { headers });
  }

  post(endpoint, body): Observable<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + endpoint,  body, { headers });
  }

  delete(endpoint, id: string): any {
    return this.http.delete(this.apiUrl + endpoint + id);
  }

  edit(user: User): any {
    return this.http.put(this.apiUrl + "/api/users/" + user.id, user);
  }

  getUsers() {
    return this.get('/api/users?page=2');
  }

  createUser(body) {
    return this.post('/api/users', body);
  }

  deleteUser(id) {
    if(confirm("Are you sure to delete user permanently from database?")){
      return this.delete("/api/users/", id);
    }
  }

  editUser(user) {
    return this.edit(user);
  }

  accord($event) {
    let isActive = $event.target.classList.contains("active");
    let isEdit = $event.target.classList.contains("edit-user");
    if($event.target.classList.contains("accordion")){
      let acc = document.getElementsByClassName('accordion');
      for(let i = 0; i<acc.length; i++){
        if(acc[i].classList.contains("active")){
          acc[i].classList.remove("active");
          let theElement = acc[i].nextElementSibling as HTMLElement;
          theElement.style.maxHeight = null;
        }
      }
      if(!isActive){
        $event.target.classList.add("active");
        let openPx = $event.target.nextElementSibling.scrollHeight;
        $('.active + .panel').css('max-height', openPx + 'px');
      }
    }
    if(isEdit) {
      let userEdit = document.getElementsByClassName('edit');
      if(!userEdit[0].classList.contains("active")){
        userEdit[0].classList.add("active");
        let openPx = userEdit[0].nextElementSibling.scrollHeight;
        $('.active + .panel').css('max-height', openPx + 'px');
      }
    }
  }

  message(msg:string, type:string, time:number) {
    this.flashMessage.show(msg, {
      cssClass: type, timeout: time
    });
  }
}
