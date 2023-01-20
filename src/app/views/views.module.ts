import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ProfileComponent } from './profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImgCropperComponent } from './profile/img-cropper/img-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    ViewsComponent,
    ProfileComponent,
    ImgCropperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ViewsRoutingModule,
    NgxMaskModule,
    TranslateModule,
    NgSelectModule,
    ImageCropperModule
  ]
})
export class ViewsModule { }
