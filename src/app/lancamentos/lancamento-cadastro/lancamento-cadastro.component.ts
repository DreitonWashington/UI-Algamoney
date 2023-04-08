import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos=[
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias=[
    
  ];

  pessoas = [
    
  ];

  lancamento = new Lancamento();

  constructor(private categoriasService:CategoriaService, private errorHandlerService:ErrorHandlerService,
      private pessoasService:PessoaService, private lancamentoService:LancamentoService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.carregarCategorias()
    this.carregarPessoas()
  }

  onSubmit(form:any){
    console.log(form)
    form.reset()
  }

  salvar(lancamentoForm: NgForm){
    return this.lancamentoService.adicionar(this.lancamento).then(()=>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Lancamento Cadastrado com Sucesso!'})
      
      lancamentoForm.reset()
      this.lancamento = new Lancamento()
    }).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }

  carregarCategorias(){
    return this.categoriasService.listarCategorias().then(categorias=>{this.categorias = categorias.map((c:any) =>{
      return {label: c.nome, value: c.codigo}
    })}).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }

  carregarPessoas(){
    return this.pessoasService.pesquisarTodos().then(pessoas=>this.pessoas=pessoas.map((p:any)=>{
      return {label: p.nome, value: p.codigo}
    })).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }
}
