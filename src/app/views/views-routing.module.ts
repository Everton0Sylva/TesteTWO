import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        pathMatch: 'full', redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
