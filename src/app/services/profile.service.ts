import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, User } from '../model/user';
import { ApiRequestService } from './apirequest.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user: IUser;
  private subjectUser: BehaviorSubject<IUser>;

  constructor(private apiRequestService: ApiRequestService,) {
    this.subjectUser = new BehaviorSubject<IUser>(this.user);
  }

  public setUser(nUser: User) {
    this.subjectUser.next(nUser)
  }

  public getUser(): Observable<IUser> {
    if (this.user == null) {
      this.initUser().then((data: any) => {
        this.setUser(data);
      })
    }
    return this.subjectUser.asObservable();
  }

  private initUser() {
    return new Promise((resolve, reject) => {
      this.apiRequestService.GET()
        .then((data: any) => {
          resolve(data);
        }).catch(error => {
          reject(error);
        })
    })
  }
}
