import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { ChatlistComponent } from './chatlist/chatlist.component';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatroomComponent,
    HeaderComponent,
    ChathistoryComponent,
    ChatlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
