import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Lancamento } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid:any;

  constructor(private lancamentoService:LancamentoService, 
    private messageService:MessageService, private confirmationService:ConfirmationService,
    private errorHandlerService:ErrorHandlerService, private router:ActivatedRoute,
    private title:Title, private auth:AuthService){}

  ngOnInit(){
    //this.pesquisar();
    this.title.setTitle("Pesquisa de Lançamentos")

  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro).then(dados=>{this.lancamentos=dados.lancamentos,this.totalRegistros=dados.total})
      .catch(error => this.errorHandlerService.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent){
    let page = 0;
    if (event.first && event.rows) {
      page = event.first / event.rows
    }
    this.pesquisar(page);
  }

  excluir(lancamento:any){
    this.confirmationService.confirm({
      message: 'Deseja excluir ?',
      accept: () => {
        this.lancamentoService.excluir(lancamento.codigo).then(()=>{
          this.grid.reset();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Lancamento Excluido!'});
        }).catch((HttpResponse)=>{
          this.errorHandlerService.handle(HttpResponse)});
      }
    })
  }

  edit(lancamento:Lancamento){
    return this.lancamentoService.buscarPorCodigo(Number(lancamento.codigo));
  }

  naoTemPermissao(permissao: string) {
    
    return this.auth.temPermissao(permissao);
  }
}
