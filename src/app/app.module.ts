import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateprojectComponent } from './createproject/createproject.component';
import { CreategoalComponent } from './creategoal/creategoal.component'
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ScrumboardComponent,
    HomepageComponent,
    CreateprojectComponent,
    CreategoalComponent,
    ChatComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
