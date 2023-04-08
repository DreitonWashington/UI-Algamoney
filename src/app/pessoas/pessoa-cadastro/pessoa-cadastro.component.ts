import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  pessoa = new Pessoa();

  constructor(private pessoaService:PessoaService, private messageService:MessageService, 
      private errorHandlerService:ErrorHandlerService){};

  onSubmit(form:any){
    console.log(form)

    form.reset()
  }

  salvar(pessoaForm:NgForm){
    return this.pessoaService.adicionar(this.pessoa).then(()=>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pessoa Cadastrada com Sucesso!'})

      this.pessoa = new Pessoa();
      pessoaForm.reset();
    }).catch(
      erro=>this.errorHandlerService.handle(erro)
    )
  }

}
