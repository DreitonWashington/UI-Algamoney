import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService:MessageService) { }

  handle(errorResponse:any){
    let msg:string;

    // if(typeof errorResponse === 'string'){
    //   msg = errorResponse;
    if(errorResponse.status >= 400 && errorResponse.status <= 499){
        msg = errorResponse.title
    }else{
      msg = 'Erro ao processar serviço remoto. Tente Novamente';
      //console.log('Ocorreu um erro', errorResponse);
      //console.log(errorResponse)
    }

    this.messageService.add({ severity: 'error', summary: 'Error', detail: `${msg}` })
  }
}
