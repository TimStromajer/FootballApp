import { Component, OnInit } from '@angular/core';
import { footballData } from 'src/app/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: any = ""
  profileImgSrc: any = "https://www.shareicon.net/data/2016/06/30/788946_people_512x512.png";
  fd = footballData;
  myMatches: Array<any> = new Array;
  myBio: String = "Rad brcam žogo."

  teams: Array<String> = new Array
  matchesPlayed: number = 0
  friendlyMatchesPlayed: number = 0
  matchesWon: number = 0
  gamesPlayed: number = 0
  gamesWon = 0
  goals: number = 0
  imgPath: String = "images/bronze-cup.png"

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.fd.forEach(match => {
      if (match.mode === "comp") {
        if (match.team1 && match.team1.includes(this.username)) {
          this.myMatches.push(match)
          this.matchesPlayed += 1
          var index = match.team1.indexOf(this.username)
          if (match.team1Score > match.team2Score) {
            this.matchesWon += 1
          }
          match.games.forEach(game => {
            this.goals += game.scoresTeam1[index]
            this.gamesPlayed += 1
            if (game.team1Score > game.team2Score) {
              this.gamesWon += 1
            }
          })
        } else if (match.team2 && match.team2.includes(this.username)) {
          this.myMatches.push(match)
          this.matchesPlayed += 1
          var index = match.team2.indexOf(this.username)
          if (match.team2Score > match.team1Score) {
            this.matchesWon += 1
          }
          match.games.forEach(game => {
            this.goals += game.scoresTeam2[index]
            this.gamesPlayed += 1
            if (game.team2Score > game.team1Score) {
              this.gamesWon += 1
            }
          })
        }
      } else if (match.mode === "friend") {
        if (match.present && match.present.includes(this.username)) {
          this.friendlyMatchesPlayed += 1
          this.myMatches.push(match)
        }
      }
    })

    if (this.username === "Matic") {
      this.profileImgSrc = "https://cdn4.iconfinder.com/data/icons/cute-minimal-geometric-cartoon-avatars/100/b-512.png"
      this.myBio = "Kadar tečem, se počutim utrujeno, zato ne tečem."
    } else if (this.username === "MartinŽ") {
      this.profileImgSrc = "https://cdn-icons-png.flaticon.com/512/4137/4137036.png"
    } else if (this.username === "MartinN") {
      this.profileImgSrc = "/assets/img/caucasion.jpg"
      this.myBio = "Ko slišim besedo \'tekma\', sem že ves prešvican."
    } else if( this.username === "Rok") {
      this.profileImgSrc = "/assets/img/boye.jpg"
    } else if (this.username === "Tim") {
      this.profileImgSrc = "https://img.freepik.com/premium-vector/movie-serial-animated-character-illustration-cartoon-movie-serial-icon-vector-icon-premium-vector_727315-13.jpg?w=2000"
      this.myBio = "Zadeti gol nasprotnika je kot sprehod po gozni poti. Preprosto, sproščajoče, ter z nekaj koreninami na poti."
    } else if (this.username === "Gregor") {
      this.profileImgSrc = "https://us.123rf.com/450wm/moremar/moremar1801/moremar180100001/92735405-face-of-an-old-man-icon-.jpg"
    }
  }

  round(val: number): number {
    return Math.round(val)
  }

}
