import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
      private pessoasService:PessoaService, private lancamentoService:LancamentoService, private messageService:MessageService,
      private route: ActivatedRoute, private router: Router, private title:Title) { }

  ngOnInit(): void {
    this.title.setTitle("Novo Lançamento")
    
    const codigoLancamento = this.route.snapshot.params['codigo'];
    
    if (codigoLancamento && codigoLancamento !== 'novo') {
      if(isNaN(codigoLancamento)){
        this.router.navigate(['pagina-nao-encontrada'])
        return
      }
      this.carregarLancamento(codigoLancamento)
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`)
  }

  carregarLancamento(codigo:number){
    this.lancamentoService.buscarPorCodigo(codigo).then((lancamento)=>{
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    }).catch((error) => this.errorHandlerService.handle(error));

    // console.log(this.lancamentoService.buscarPorCodigo(codigo))
  }

  get editando(){
    return Boolean(this.lancamento.codigo)
  }

  onSubmit(form:any){
    console.log(form)
    form.reset()
  }

  salvar(lancamento:NgForm){
    if(this.editando){
      this.atualizarLancamento(lancamento)
    }else{
      this.adicionarLancamento(lancamento)
    }
  }

  async adicionarLancamento(lancamentoForm: NgForm){
    await this.lancamentoService.adicionar(this.lancamento).then((lancamentoAdd)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lancamento Cadastrado com Sucesso!' });

      this.router.navigate(['lancamentos',lancamentoAdd.codigo])
    }).catch((erro)=>this.errorHandlerService.handle(erro));
  }

  novo(lancamento:NgForm){
    lancamento.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1)
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarLancamento(lancamento:NgForm){
    this.lancamentoService.atualizar(this.lancamento).then(response=>{
      this.lancamento = response;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lancamento Atualizado com Sucesso!' })
      this.atualizarTituloEdicao();
    }).catch(erro => this.errorHandlerService.handle(erro))
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
