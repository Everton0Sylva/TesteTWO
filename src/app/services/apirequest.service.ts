import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private router: Router, private http: HttpClient) { }

  public GET() {
    return new Promise((resolve, reject) => {
      let url = environment.url + "/profile";
      this.http.get(url, {
      })
        .toPromise()
        .then(
          data => {
            resolve(data);
          }
        ).catch(error => {
          reject(error);
        })
        ;
    });
  }
  

  public POST(user: IUser) {
    return new Promise((resolve, reject) => {
      let url = environment.url + "/profile";
      this.http.post(url, user, {
      })
        .toPromise()
        .then(
          data => {
            resolve(data);
          }
        ).catch(error => {
          reject(error);
        })
        ;
    });
  }

  public GetLocalJSON(urlToJson: string) {
    return new Promise((resolve, reject) => {
      this.http.get(urlToJson, {
      })
        .toPromise()
        .then(
          data => {
            resolve(data);
          }
        ).catch(error => {
          reject(error);
        })
        ;
    });
  }
}