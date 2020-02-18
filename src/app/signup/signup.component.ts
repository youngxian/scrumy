import { Component, OnInit } from '@angular/core';
import { Scrumuser } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
feedback = '';

  constructor(private _scrumdataService : ScrumdataService) { }
  
userTypes = ['regular user', 'project owner'];
  scrumUserModel = new Scrumuser('', '', '', '','');
  ngOnInit() {
  }



  signup_submit(){
    console.log(this.scrumUserModel);
    this._scrumdataService.signup(this.scrumUserModel).subscribe(
      data => {
        console.log('Success!', data)
        this.feedback = 'Your account was created successfully'
      },
      error => {
        console.error('Error!', error)
        this.feedback = 'Signup Failed'
      }
    )
  }

}
