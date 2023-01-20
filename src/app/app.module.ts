import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiRequestService } from './services/apirequest.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from './components/components.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileService } from './services/profile.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot({
      maxTime: 300000,
      blur: 8,
      fgsType: "double-bounce",
      fgsSize: 80,
      fgsColor: "#cacaca",
      hasProgressBar: false,
      gap: 6,
      text: "CARREGANDO",
      textColor: "#cacaca",
      textPosition: "center-center",
    }),
    NgxMaskModule.forRoot(),
    ComponentsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    ApiRequestService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
