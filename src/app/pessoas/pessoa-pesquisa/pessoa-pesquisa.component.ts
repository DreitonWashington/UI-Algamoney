import { ErrorHandlerService } from './../../core/error-handler.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFilter, PessoaService } from '../pessoa.service';
import { HttpResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new PessoaFilter();
  pessoas = []
  @ViewChild('tabela') grid:any; 

  constructor(private pessoaService:PessoaService, private confirmationService:ConfirmationService,
      private messageService:MessageService, private error:ErrorHandlerService){}

  ngOnInit(){
    //this.pesquisar();
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then(dados=>{/*console.log(dados.total),*/this.pessoas=dados.pessoas,this.totalRegistros=dados.total});
  }

  aoMudarPagina(event: LazyLoadEvent){
    let page = 0;
    if (event.first && event.rows) {
      page = event.first / event.rows
    }
    this.pesquisar(page);
  }
  
  pesquisarTodos(){
    this.pessoaService.pesquisarTodos();
  }

  remover(pessoa:any){
    this.confirmationService.confirm({
        message: 'Deseja excluir ?',
        accept: async () => {
          this.pessoaService.excluir(pessoa.codigo).then(() => {
            this.grid.reset()
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pessoa Excluida!'});
          }).catch((HttpErrorResponse)=>{
            this.error.handle(HttpErrorResponse.error);
            //console.log(HttpErrorResponse);
          })
        }
      });
  }

  mudarStatus(pessoa:any){
    this.pessoaService.trocarStatus(pessoa.codigo, pessoa.ativo).then(() => {
      this.grid.reset()
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Status atualizado!'})
    })
  }
}
