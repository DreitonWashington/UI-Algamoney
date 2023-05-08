import { lastValueFrom, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';


export class PessoaFilter{
  nome?:string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl:string = '';
  
  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
  }


  async pesquisar(filtro:PessoaFilter):Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    let params = new HttpParams();

    params = params.set('size', filtro.itensPorPagina.toString());
    params = params.set('page', filtro.pagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    let source = this.http.get(`${this.pessoasUrl}`, { headers, params });
    const dados = await lastValueFrom(source).then((response:any)=>{
      
      const responseJson = response;
      const pessoas = response['content'];

      const resultado = {
        pessoas: pessoas,
        total: responseJson.totalElements
      };

      return resultado;});
      return dados;
  }

  async pesquisarTodos():Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    let source = this.http.get(this.pessoasUrl, {headers});
    let dados = await lastValueFrom(source).then((response:any)=>response['content'])

    return dados;
  }

  async excluir(id:number):Promise<void>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    await lastValueFrom(this.http.delete(`${this.pessoasUrl}/${id}`, {headers})).then(()=>null);
  }

  async trocarStatus(id:number, status:string):Promise<void>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    })

    let body:any = {
      status: !status
    } 

    await lastValueFrom(this.http.put(`${this.pessoasUrl}/${id}/ativo`,body.status, {headers})).then(()=>null);
  }

  async pesquisarPorId(id:Number):Promise<Pessoa>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return await lastValueFrom(this.http.get(`${this.pessoasUrl}/${id}`, {headers})).then((response:any) => response)
  }

  async adicionar(pessoa:Pessoa):Promise<Pessoa>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return await lastValueFrom(this.http.post(this.pessoasUrl, pessoa, {headers})).then((response:any)=>response)
  }

  async atualizar(pessoa:Pessoa){
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });

    return await lastValueFrom(this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, {headers}))
  }

  
}
