import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService:MessageService, private router:Router) { }

  handle(errorResponse:any){
    let msg:string;
    
    
    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }else if(errorResponse instanceof NotAuthenticatedError){
      msg = 'Sua sessão expirou!'
      this.router.navigate(['/login'])
    }
    else if(errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499){
      msg = 'Erro ao processar serviço remoto. Tente Novamente';
      
      
      if(errorResponse.status === 403){
        msg = 'Você não tem permissão!!!'
      }
      

      try {
        msg = errorResponse.error[0];
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    

    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg })
  }
}
