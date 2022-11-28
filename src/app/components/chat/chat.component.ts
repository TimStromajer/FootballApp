import { Component, OnInit, ViewChild } from '@angular/core';
import { DbConnectService } from 'src/app/services/DB/db-connect.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  allMsgs: Array<msg> = new Array;
  @ViewChild('msgTextArea') msgTextArea: any;

  constructor(private dbConnectService: DbConnectService) { }

  ngOnInit(): void {
    this.allMsgs.push(new msg("Tim", "pozdrav iz moje strani", "02.02.3123"))
    this.allMsgs.push(new msg("Janez", "Gremo naprej", "02.02.4123"))
    // this.dbConnectService.getAllMsgs()
    //   .subscribe(data => {
    //     this.allMsgs = data;
    //   })
  }

  postMsg(msgText: any) {
    let cd = new Date
    let formated = cd.getDate() + "." +  (cd.getMonth() + 1) + "." + cd.getFullYear() + " " + cd.getHours() + ":" + (cd.getMinutes() < 10 ? "0" + cd.getMinutes() : cd.getMinutes())
    this.allMsgs.push(new msg("Nekdo", msgText, formated))
    this.msgTextArea.nativeElement.value = "";
  }

}

class msg {
  username: string;
  text: string;
  time: any;

  constructor(username: any, text: any, time: any) {
    this.username = username;
    this.text = text;
    this.time = time;
  }
}
