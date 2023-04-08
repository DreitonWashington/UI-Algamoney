import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { TranslateService } from '@ngx-translate/core';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(localePt, 'pt-BR');  

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ErrorHandlerService,
    LancamentoService, 
    MessageService, 
    ConfirmationService,
    TranslateService
  ]
})
export class CoreModule { }
