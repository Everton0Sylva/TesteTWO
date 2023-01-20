import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Projeto TWO';
  constructor(private translate: TranslateService) {
    let lang = "pt-BR";
    
   this.translate.setDefaultLang(lang);
   this.translate.use(lang);
  }
}
