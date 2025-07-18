import { Component, inject, signal } from '@angular/core';
import { TarefaService } from '../../../core/services/tarefa.service';
import { TarefaModel } from '../../../core/models/tarefa.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-tarefas',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-tarefas.html',
  styleUrl: './consulta-tarefas.css',
})
export class ConsultaTarefas {
  //injeções de dependência
  private service = inject(TarefaService);

  //atributo para armazenar a lista de tarefas
  tarefas = signal<TarefaModel[]>([]);
  finalizado = signal<boolean>(false);
  mensagem = signal<string>('');

  ngOnInit(): void {
    this.service.getAll().subscribe((resposta) => {
      this.tarefas.set(resposta);
      this.finalizado.set(true);
    });
  }

  onDelete(id: string) {
    if(confirm('Deseja realmente excluir essa tarefa?')){
      this.service.delete(id).subscribe((resposta) => {
      this.mensagem.set(`Tarefa ${resposta.nome} excluida com sucesso!`);
      this.tarefas.set(this.tarefas().filter(tarefa => tarefa.id !== id));
      });
    }

  }
}
