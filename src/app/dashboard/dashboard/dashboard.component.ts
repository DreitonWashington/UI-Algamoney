import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  optionsLine = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }

  optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }
  pieChartData:any;
  lineChartData:any;

  constructor(private dashboardService: DashboardService, private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.configurarGraficoPizza()
    this.configurarGraficoLinhas()
  }

  configurarGraficoPizza(){
    this.dashboardService.lancamentosPorCategoria().then((dados) => {
      this.pieChartData = {
        labels: dados.map(dado => dado.categoria.nome),
        datasets: [
          {
            data: dados.map(dado => dado.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#DD447', '#3366CC', '#DC3912']
          }
        ]
      }
    }); 
  }

  configurarGraficoLinhas(){
    this.dashboardService.lancamentosPorDia().then((dados) => {
      console.log(dados)
      const diasDoMes = this.configurarDiasMes();
      const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes)
      const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes)
      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      }
    })
  }

  private totaisPorCadaDiaMes(dados:any, diasDoMes:any){
    const totais:number[] = []
    for(let dia of diasDoMes){
      let total = 0;

      for(let dado of dados){
        if(dado.dia.getDate() === dia){
          total = dado.total;

          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes(){
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth()+1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];

    for(let i = 1 ; i < quantidade ; i++){
      dias.push(i);
    }

    return dias;
  }

}
