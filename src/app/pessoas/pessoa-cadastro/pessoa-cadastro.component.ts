import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoa = new Pessoa();

  constructor(private pessoaService:PessoaService, private messageService:MessageService, 
      private errorHandlerService:ErrorHandlerService, private route:ActivatedRoute, private title:Title,
      private router:Router){};
  
  ngOnInit():void{
    this.title.setTitle("Nova Pessoa")

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa && codigoPessoa !== 'novo'){
      if(isNaN(codigoPessoa)){
        this.router.navigate(['pagina-nao-encontrada'])
        return
      }
      this.carregarPessoa(codigoPessoa)
    }
    // this.carregarPessoa(codigoPessoa);
  }
  
  onSubmit(form:any){
    console.log(form)
    form.reset()
  }

  get editando(){
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo:Number){
    this.pessoaService.pesquisarPorId(codigo).then((pessoa)=>{
      this.pessoa = pessoa;
      this.title.setTitle(`Editando Pessoa: ${pessoa.nome}`)
    }).catch((erro)=> this.errorHandlerService.handle(erro))
  }

  async adicionarPessoa(pessoaForm:NgForm){
    await this.pessoaService.adicionar(this.pessoa).then((response)=>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pessoa Cadastrada com Sucesso!'})
      
      this.router.navigate(['pessoas', response.codigo])
    }).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }

  atualizarPessoa(pessoaForm:NgForm){
    this.pessoaService.atualizar(this.pessoa).then((response:any)=>{
      this.pessoa = response;

      this.title.setTitle(`Edição da Pessoa: ${this.pessoa.nome}`)
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pessoa Atualizada com Sucesso!'})
    }).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }

  novo(pessoaCadastro:NgForm){
    pessoaCadastro.reset()
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1)
    this.router.navigate(['/pessoas/novo'])
  }

  salvar(pessoaCadastro:NgForm){
    if(this.editando){
      this.atualizarPessoa(pessoaCadastro)
    }else{
      this.adicionarPessoa(pessoaCadastro)
    }
  }

}
