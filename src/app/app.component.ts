import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private config: PrimeNGConfig, 
    private translateService: TranslateService,
    private router:Router
  ) {}



  ngOnInit() {
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe(res => this.config.setTranslation(res));
  }

  exibirNav(){
    return this.router.url !== "/login"
  }

}
