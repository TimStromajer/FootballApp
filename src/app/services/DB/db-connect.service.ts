import { Injectable } from '@angular/core';
import { mergeMap, Observable, timer } from 'rxjs';
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

  getAllMsgsRepeat(): Observable<any> {
    return timer(0, 10 * 1000).pipe(mergeMap(_ => this.getAllMsgs()))
  }

  postmsg(text: any, sender: any, receiver: any, time: any): Observable<any> {
    let reqBody = { "sender": sender, "receiver": receiver, "text": text, "time": time }
    let reqHeaders = new HttpHeaders({"Content-Type": "application/json"})
    return this.http.post<any>(this.uri + "/.netlify/functions/messages", reqBody, { headers: reqHeaders})
  }
}

