import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    component:ChatroomComponent
  },
  {
    path:'chatlist',
    component:ChatlistComponent
  },
  {
    path:'chatroom',
    component:ChatroomComponent
  },
  {
    path:'chathistory',
    component:ChathistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
