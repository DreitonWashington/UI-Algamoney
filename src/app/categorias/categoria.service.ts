import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl:string =''
  
  constructor(private http:HttpClient) { 
    this.categoriaUrl = `${environment.apiUrl}/categorias`
  }


  async listarCategorias():Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AQWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    let source = this.http.get(this.categoriaUrl, {headers});
    let data = await lastValueFrom(source).then((response:any)=>response['content']);

    return data;
  }
}
