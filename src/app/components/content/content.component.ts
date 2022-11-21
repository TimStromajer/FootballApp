import { Component, OnInit } from '@angular/core';
import { footballData } from 'src/app/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  disabled = false;
  fd = footballData;
  playersInfo: Array<playerInfo> = new Array;
  players: Array<string> = new Array;

  constructor(private router : Router) { }

  ngOnInit(): void {
    // create players
    this.fd.forEach(match => {
      if (match.team1) {
        match.team1.forEach(pl => {
          if (!this.players.includes(pl)) {
            this.players.push(pl)
            this.playersInfo.push(new playerInfo(pl))
          }
        })
      }
      if (match.team2) {
        match.team2.forEach(pl => {
          if (!this.players.includes(pl)) {
            this.players.push(pl)
            this.playersInfo.push(new playerInfo(pl))
          }
        })
      }
      if (match.present) {
        match.present.forEach(pl => {
          if (!this.players.includes(pl)) {
            this.players.push(pl)
            this.playersInfo.push(new playerInfo(pl))
          }
        })
      }
    });

    // give players data
    this.fd.forEach(match => {
      this.playersInfo.forEach(pl => {
        if (match.team1) {
          let team: any = null;
          let index: any = null;
          
          if (match.team1.includes(pl.name)) {
            pl.totalScore += 3;
            team = 1
            index = match.team1.indexOf(pl.name)
          } else if (match.team2.includes(pl.name)) {
            pl.totalScore += 1;
            team = 2
            index = match.team2.indexOf(pl.name)
          }
          match.games.forEach(game => {
            if (team == 1) pl.totalGoals += game.scoresTeam1[index]
            else if (team == 2) pl.totalGoals += game.scoresTeam2[index]
          })
        }
        else if (match.present) {
          if (match.present.includes(pl.name)) {
            pl.totalScore += 1;
          }
        }

      })
    });

    // sort 
    this.playersInfo.sort((a, b) => {
      if (a.totalScore > b.totalScore) return -1;
      else if (a.totalScore < b.totalScore) return 1;
      else if (a.totalGoals > b.totalGoals) return -1;
      else return 1;
    })
  }

  redirectChat() {
    this.router.navigate(["/chat"])
  }

}

class playerInfo {
  name: string;
  totalScore: number;
  totalGoals: number;

  constructor(name: any) {
    this.name = name;
    this.totalScore = 0;
    this.totalGoals = 0;
  }
}
