import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [

    { 
      path: '', 
      component: LancamentoPesquisaComponent, 
      canActivate: [AuthGuard], 
      data: { roles:['ROLE_PESQUISAR_LANCAMENTO'] } 
    },
    { 
      path: 'novo', 
      component: LancamentoCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles:['ROLE_CADASTRAR_LANCAMENTO'] }
     },
    { 
      path: ':codigo', 
      component: LancamentoCadastroComponent, 
      canActivate: [AuthGuard],
      data: { roles:['ROLE_CADASTRAR_LANCAMENTO'] }
    },
    
  ];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class LancamentosRoutingModule { }
  