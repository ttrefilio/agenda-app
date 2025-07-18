import { Routes } from '@angular/router';
import { CadastroTarefas } from './components/pages/cadastro-tarefas/cadastro-tarefas';
import { ConsultaTarefas } from './components/pages/consulta-tarefas/consulta-tarefas';
import { EdicaoTarefas } from './components/pages/edicao-tarefas/edicao-tarefas';
import { DashboardTarefas } from './components/pages/dashboard-tarefas/dashboard-tarefas';
import { Notfound } from './components/errors/notfound/notfound';

export const routes: Routes = [
  {
    path: 'cadastrar-tarefas',
    component: CadastroTarefas,
  },
  {
    path: 'consultar-tarefas',
    component: ConsultaTarefas,
  },
  {
    path: 'editar-tarefas/:id',
    component: EdicaoTarefas,
  },
  {
    path: 'dashboard',
    component: DashboardTarefas,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: '**',
    component: Notfound
  }
];
