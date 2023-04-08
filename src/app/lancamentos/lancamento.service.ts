import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';

export class LancamentoFiltro{
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 3;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  datePipe = new DatePipe('pt-BR');

  lancamentosUrl='http://localhost:8080/lancamentos'

  constructor(private http: HttpClient) { }

  async pesquisar(filtro: LancamentoFiltro): Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    

    let params = new HttpParams();

    params = params.set('size', filtro.itensPorPagina.toString());
    params = params.set('page', filtro.pagina.toString());

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!) 
    }

    if(filtro.dataVencimentoFim){
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!)
    }

    let source = this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
    const dados = await lastValueFrom(source).then((response:any)=>{
      
      const responseJson = response;
      const lancamentos = response['content'];

      const resultado = {
        lancamentos: lancamentos,
        total: responseJson.totalElements
      };

      return resultado;});
    return dados;

  }

  async excluir(id:number):Promise<void>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    await lastValueFrom(this.http.delete(`${this.lancamentosUrl}/${id}`, {headers})).then(()=>null);
  }

  async adicionar(lancamento:Lancamento):Promise<Lancamento>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return await lastValueFrom(this.http.post(this.lancamentosUrl, lancamento, {headers})).then((response:any)=>response);
  }
}
