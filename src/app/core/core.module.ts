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
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { RelatoriosService } from '../relatorios/relatorios.service';


registerLocaleData(localePt, 'pt-BR');  

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
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
    TranslateService,
    Title,
    AuthService,
    DashboardService,
    RelatoriosService
  ]
})
export class CoreModule { }
