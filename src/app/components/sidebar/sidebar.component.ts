import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';
import { IUser, User } from 'src/app/model/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public isToggled: boolean = false;

  public menuItens = []

  public randImg: number;

  public currentUser: IUser;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.currentUser = new User();
    this.menuItens.push(
      { icon: "fas fa-home", label: "Home", route: "/" },
      { icon: "fas fa-chart-bar", label: 'my-score', route: "/" },
      { icon: "fas fa-layer-group", label: 'time-sheet', route: "/" },
      { icon: "fas fa-check-square", label: 'overtime-request', route: "/" }
    )
    this.randImg = (Math.floor(Math.random() * (9 - 1 + 1)) + 1);

    this.currentUser.firstName = "Fulano";
    this.currentUser.lastName = "de Tal";
    this.currentUser.email = "emailteste@local.com";

    this.profileService.getUser().subscribe((user: IUser) => {
      if (!isNullOrUndefined(user)) {
        if (!isNullOrUndefined(user.firstName) && !isNullOrUndefined(user.firstName)) {
          this.currentUser = user;
          debugger
        }
      }
    });
  }

  onToggle() {
    this.isToggled = !this.isToggled;
  }

}
