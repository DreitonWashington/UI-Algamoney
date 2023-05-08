import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;
  usuarioLogado:string = '';

  constructor(private auth: AuthService, private error:ErrorHandlerService, private router:Router){}

  ngOnInit(){
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao:string){
    return this.auth.temPermissao(permissao)
  }

  novoAccessToken(){
    this.auth.obterNovoAccessToken();
  }

  logout(){
    this.auth.logout().then(()=>{
      this.router.navigate(['/login'])
    }).catch(erro => this.error.handle(erro))
  }
}
