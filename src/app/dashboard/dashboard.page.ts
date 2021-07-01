import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ChatsService } from '../services/chats.service';
export class TODO {
  $key: string;
  userMessage: string;
  message: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  userId:string;
  userName:string;
  Tasks: TODO[];

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private chatService: ChatsService
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.userId=res.uid
        this.chatService.getUserName(this.userId).subscribe((res) => {
          console.log('usuario', res);
          if (res!== null){
            this.userName =res['name']
          }
        });
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
    this.chatService.getTasks().subscribe((res) => {
      this.Tasks = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as TODO
        };
      })
    });
  }
  todoList() {
    this.chatService.getTasks()
    .subscribe((data) => {
      console.log(data)
    })
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }
  

}
