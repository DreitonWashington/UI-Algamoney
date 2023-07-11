import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorios-lancamentos',
  templateUrl: './relatorios-lancamentos.component.html',
  styleUrls: ['./relatorios-lancamentos.component.css']
})
export class RelatoriosLancamentosComponent implements OnInit {

  periodoInicio:any
  periodoFim:any
  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit(): void {
  }

  gerar(){
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim).then((relatorio: any)=>{
      const url = window.URL.createObjectURL(relatorio)
      window.open(url);
    })
  }

}
