import { Component, OnInit } from '@angular/core';
import { Createproj } from '../createproj';
import { ScrumdataService } from '../scrumdata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService, private _router: ActivatedRoute) { }

  ngOnInit(): void {
  }
  roleid = this._router.snapshot.paramMap.get('role_id');
  Auth = JSON.parse(localStorage.getItem('Authobj'));
  projectid = this.Auth.project_id

  feedback = '';
  changerole = new Createproj('', '', this.roleid, '', this.projectid);
  userTypes :any[]= ['Owner', 'Quality Analyst', 'Developer'];

  onSubmit(){
    this._scrumdataService.changerole(this.changerole).subscribe(
      data => {
        console.log('Success! here', data)
        this.feedback = 'Your role has been changed to ' + data['role'];
      },
      error => {
        console.log('Error', error)
        this.feedback = JSON.stringify(error);
      }
    )
  }
}
