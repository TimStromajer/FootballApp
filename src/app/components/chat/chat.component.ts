import { Component, OnInit, ViewChild } from '@angular/core';
import { DbConnectService } from 'src/app/services/DB/db-connect.service';
import { UserManagerService } from 'src/app/services/User/user-manager.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  allMsgs: Array<msg> = new Array;
  username: String = "";
  msgText: any;

  constructor(private userManagerService: UserManagerService, private dbConnectService: DbConnectService, private router: Router) { }

  ngOnInit(): void {
    this.userManagerService.getUser()
      .subscribe(user => {
        if (user.username != null) {
          this.username = user.username
          console.log("chat: " + user.username)
          this.dbConnectService.getAllMsgsRepeat()
            .subscribe(data => {
              this.allMsgs = data.reverse()
            })
        } else {
          this.router.navigate(['login']);
        }
      })
    
  }

  sendMsg() {
    let cd = new Date
    let formated = cd.getDate() + "." +  (cd.getMonth() + 1) + "." + cd.getFullYear() + " " + cd.getHours() + ":" + (cd.getMinutes() < 10 ? "0" + cd.getMinutes() : cd.getMinutes())
    this.allMsgs.unshift(new msg(this.username, "NK Orh", this.msgText, formated))
    this.dbConnectService.postmsg(this.msgText, this.username, "NK Orh", formated)
      .subscribe(data => data)
    this.msgText = ""
  }

  getProfileImg(name: String): String {
    if (name === "Matic") {
      return "https://cdn4.iconfinder.com/data/icons/cute-minimal-geometric-cartoon-avatars/100/b-512.png"
    } else if (name === "MartinŽ") {
      return "https://cdn-icons-png.flaticon.com/512/4137/4137036.png"
    } else if (name === "MartinN") {
      return "/assets/img/caucasion.jpg"
    } else if(name === "Rok") {
      return "/assets/img/boye.jpg"
    } else if (name === "Tim") {
      return "https://img.freepik.com/premium-vector/movie-serial-animated-character-illustration-cartoon-movie-serial-icon-vector-icon-premium-vector_727315-13.jpg?w=2000"
    } else if (name === "Gregor") {
      return "https://us.123rf.com/450wm/moremar/moremar1801/moremar180100001/92735405-face-of-an-old-man-icon-.jpg"
    } else {
      return "https://www.shareicon.net/data/2016/06/30/788946_people_512x512.png"
    }
  }

}

class msg {
  sender: string;
  receiver: string;
  text: string;
  time: any;

  constructor(sender: any, receiver: any, text: any, time: any) {
    this.sender = sender;
    this.receiver = receiver;
    this.text = text;
    this.time = time;
  }
}
