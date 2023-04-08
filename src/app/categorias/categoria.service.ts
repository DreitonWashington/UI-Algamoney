import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  categoriaUrl = "http://localhost:8080/categorias"

  async listarCategorias():Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    let source = this.http.get(this.categoriaUrl, {headers});
    let data = await lastValueFrom(source).then((response:any)=>response['content']);

    return data;
  }
}
