import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _scrumdataservice : ScrumdataService, private _router: Router) { }
  scrumLoginUserModel = new Scrumuser('', '', '', '', '');
  feedback = '';
  ngOnInit() {
  }
  onLoginSubmit(){
    this._scrumdataservice.login(this.scrumLoginUserModel).subscribe(
      data => {
        console.log('Success', data)
        localStorage.setItem('Authuser', JSON.stringify(this.scrumLoginUserModel));
        localStorage.setItem('Authobj', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        this._router.navigate(['/scrumboard', data['project_id']]);
      },
      error => {
        console.log('Error', error)
        this.feedback = "Invalid credentials"
      }
    )
  }
}
