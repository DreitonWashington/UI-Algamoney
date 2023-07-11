import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosLancamentosComponent } from './relatorios-lancamentos/relatorios-lancamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  { path: 'lancamentos',
    component: RelatoriosLancamentosComponent,
    canActivate: [ AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
