import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  lancamentoUrl?: string;

  constructor(private http: HttpClient) { 
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  /* Depois tirar date da variavel source*/
  async lancamentosPorCategoria(): Promise<Array<any>>{
    let source = this.http.get(`${this.lancamentoUrl}/estatistica/por-categoria?date=2022-06-08`);
    
    return await lastValueFrom(source).then((response:any) => response);
  }

  /* Depois tirar date da variavel source*/
  async lancamentosPorDia(): Promise<Array<any>>{
    let source = this.http.get(`${this.lancamentoUrl}/estatistica/por-dia?date=2022-06-08`)

    return await lastValueFrom(source).then((response:any) => {
      const dados = response;
      this.converterStringsParaDatas(response);
      return dados;
    });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      let offset = new Date().getTimezoneOffset() * 60000;

      dado.dia = new Date(dado.dia);
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }

}
