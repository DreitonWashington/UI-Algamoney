import { CanActivate } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { PessoasCadastroContatoComponent } from './pessoas-cadastro-contato/pessoas-cadastro-contato.component';
import { DropdownModule } from 'primeng/dropdown';





@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
    PessoasCadastroContatoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    SharedModule,
    PanelModule,
    DialogModule,
    PessoasRoutingModule,
  
  ],
  exports: []
})
export class PessoasModule { }
