import { Component, OnInit } from '@angular/core';
import { Createproj } from '../createproj';
import { ScrumdataService } from '../scrumdata.service'
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService) { }

  ngOnInit(): void {
  }

  response = '';
  data = JSON.parse(localStorage.getItem('Authuser'));
  fname = JSON.parse(localStorage.getItem('Authobj'));
  createproj = new Createproj(this.fname.name, this.data.email, this.data.password, 'regular user', '');

  oncreateSubmit() {
    this._scrumdataService.createproject(this.createproj).subscribe(
      data => {
        this.response = JSON.stringify(data.message);
      },
      error => {
        console.log("error " + JSON.stringify(error));
      }
    )
  }

}
