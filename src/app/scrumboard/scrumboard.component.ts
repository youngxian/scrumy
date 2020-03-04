import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {
  public taskForTheWeek: any[] = [];
  public taskForTheDay: any[] = [];
  public verify: any[] = [];
  public done: any[] = [];
  role: any;
  trail: any;
  _participants: any;
  project_id = 0;
  rtn: any;
  rolee: any;
  username: any;
  id: string;
  goals: any;
  projectid: any;
  theuser: any = JSON.parse(localStorage.getItem('Authobj'));
  yourname = this.theuser.name;
  feedback = '';

  constructor(private _scrumdataService: ScrumdataService, private _route: ActivatedRoute, private _router: Router) { 
    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')));
  }

  ngOnInit(): void {
this.getProjectGoals();
  }


  calcultateRole(val) {
    val = val.split("-");
    if ((val[3] % 4) === 3) {
      return 3;
    }
    if ((val[3] % 4) === 2) {
      return 2;
    }
    if ((val[3] % 4) === 1) {
      return 1;
    }
    if ((val[3] % 4) === 0) {
      return 0;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      let goal = event.item.data;
      event.item.data.status = this.calcultateRole(event.container.id);
      this._scrumdataService.edittask(goal)
        .subscribe(
          res => {
            console.log('Successful ' + res);
          },
          error => {
            console.log('error ', error);
          })

    }
  }

  onClick(task_for_the_week: string) {
    this._router.navigate(['/creategoal/', task_for_the_week])
  }

  startSprint() {
    this.projectid = JSON.parse(localStorage.getItem('Authobj'));

    console.log('the project id' + this.projectid.project_id)
    this._scrumdataService.createSprint(this.projectid.project_id).subscribe(
      data => {
        this.feedback = "sprint just started"
        console.log("successfull: sprint : " + data["message"])
      },
      error => {
        console.log('sprint error', JSON.stringify(error));
        this.feedback = "Sprint Started";
      }
    )
  }
  onClickrole(participant) {
    console.log("the participant " + JSON.stringify(participant["id"]))
    this._router.navigate(['/changerole/', participant["id"]]);
  }
  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {
        this._participants = data['data'];
        this.role = JSON.parse(localStorage.getItem('Authobj'));
        this.rolee = this.role.role;
        this.username = this.role.name;
        this.id = this.role.role_id;
      },
      error => {
        console.log('error', error)
      }
    )
  }

}
