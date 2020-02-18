import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser } from './scrumuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {

  constructor(private _http: HttpClient) {}
  _url = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';
  _loginUrl = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';
  _scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';
  _updatetaskUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';
  sprintUrl = "https://liveapi.chatscrum.com/scrum/api/scrumsprint/";
  _changerole = "https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/";

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  signup(user: Scrumuser) {
    return this._http.post<any>(this._url, { 'email': user['email'], 'password': user['password'], 'full_name': user['fullname'], 'usertype': user['type'], 'projectname': user['projname'] }, this.httpOptions);
  }

  login(user: Scrumuser) {
    return this._http.post<any>(this._loginUrl, { 'username': user['email'], 'password': user['password'], 'project': user['projname'] }, this.httpOptions);
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
