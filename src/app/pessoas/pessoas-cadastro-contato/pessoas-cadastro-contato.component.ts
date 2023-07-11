import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoas-cadastro-contato',
  templateUrl: './pessoas-cadastro-contato.component.html',
  styleUrls: ['./pessoas-cadastro-contato.component.css']
})
export class PessoasCadastroContatoComponent implements OnInit {

  @Input() contatos: Array<Contato> = [];

  exibindoFormularioContato = false;
  contato:Contato = new Contato();
  contatoIndex:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  prepararNovoContato(){
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(frmContato: NgForm){
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    frmContato.reset();
  }

  clonarContato(contato:Contato){
    return new Contato(contato.codigo,contato.nome,contato.email,contato.telefone);
  }

  prepararEdicaoContato(contato:Contato, index:number){
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index:number){
    this.contatos.splice(index, 1)
  }

  get editando(){
    return this.contato && this.contato.codigo;
  }

}
