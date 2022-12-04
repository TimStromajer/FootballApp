import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbConnectService {

  uri: string = environment.FUNCTIONS_URL //http://localhost:9999

  constructor(private http: HttpClient) {}

  getAllMsgs(): Observable<any> {
    return this.http.get<any>(this.uri + "/.netlify/functions/messages")
  }

  postmsg(text: any, username: any): Observable<any> {
    let reqBody = { "username": username, "text": text, time: "time" }
    let reqHeaders = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(this.uri + "/.netlify/functions/messages", reqBody, { headers: reqHeaders})
  }
}

