import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RelatoriosLancamentosComponent } from './relatorios-lancamentos/relatorios-lancamentos.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    RelatoriosLancamentosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
