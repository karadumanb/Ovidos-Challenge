import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SharedService {
  apiUrl = 'https://reqres.in';

  constructor(private http: HttpClient) { }

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
    return this.http.delete(this.apiUrl + endpoint + '/' + id);
  }

  edit(user: User): any {
    return this.http.put(this.apiUrl, user);
  }

  getUsers() {
    return this.get('/api/users?page=2');
  }

  createUser(body) {
    return this.post('/api/users', body);
  }

  deleteUser(id) {
    return this.delete("/api/users", id);
  }

  editUser(user) {
    return this.edit(user);
  }
}
