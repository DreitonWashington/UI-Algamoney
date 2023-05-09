import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  //Antigo form
  //lancamento = new Lancamento();

  formulario!: FormGroup;

  constructor(private categoriasService:CategoriaService, private errorHandlerService:ErrorHandlerService,
      private pessoasService:PessoaService, private lancamentoService:LancamentoService, private messageService:MessageService,
      private route: ActivatedRoute, private router: Router, private title:Title,
      private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.configurarFormulario()
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

  //Apenas para formularios reativos
  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      //valor inicial e a validação
      codigo: [null],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatorio, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    })
  }

  validarObrigatorio(input: FormControl){
    return (input.value) ? null : { obrigatorio: true}
  }

  validarTamanhoMinimo(valor:number){
    return (input:FormControl) => {
      return(!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho:valor}};
    }
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`)
  }

  carregarLancamento(codigo:number){
    this.lancamentoService.buscarPorCodigo(codigo).then((lancamento)=>{
      //this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
    }).catch((error) => this.errorHandlerService.handle(error));

    // console.log(this.lancamentoService.buscarPorCodigo(codigo))
  }

  get editando(){
    return Boolean(this.formulario.get('codigo')?.value)
  }

  onSubmit(form:any){
    console.log(form)
    form.reset()
  }

  salvar(){
    if(this.editando){
      this.atualizarLancamento()
    }else{
      this.adicionarLancamento()
    }
  }

  async adicionarLancamento(){
    await this.lancamentoService.adicionar(this.formulario.value).then((lancamentoAdd)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lancamento Cadastrado com Sucesso!' });

      this.router.navigate(['lancamentos',lancamentoAdd.codigo])
    }).catch((erro)=>this.errorHandlerService.handle(erro));
  }

  novo(){
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value).then(response=>{
      //this.lancamento = response;
      this.formulario.patchValue(response)

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
