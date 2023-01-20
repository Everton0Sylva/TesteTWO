import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent {
  constructor(private router: Router) {
  }
}
