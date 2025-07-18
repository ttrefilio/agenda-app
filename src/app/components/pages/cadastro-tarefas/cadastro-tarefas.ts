import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TarefaService } from '../../../core/services/tarefa.service';
import { TarefaModel } from '../../../core/models/tarefa.model';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-tarefas.html',
  styleUrl: './cadastro-tarefas.css',
})
export class CadastroTarefas {
  formCadastro!: FormGroup;
  prioridades: string[] = ['Baixa', 'Média', 'Alta'];
  mensagem = signal<string>('');

  //injeção de dependência
  private fb = inject(FormBuilder);
  private service = inject(TarefaService);

  ngOnInit() {
    //construindo o formulario reativo
    this.formCadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      prioridade: ['', [Validators.required]],
      finalizado: [false],
    });
  }

  //evento de submit do formulario
  onSubmit() {
    if (this.formCadastro.valid) {
     const tarefa: TarefaModel = {
      id: uuidv4(),
      nome: this.formCadastro.value.nome,
      data: this.formCadastro.value.data,
      hora: this.formCadastro.value.hora,
      prioridade: this.formCadastro.value.prioridade,
      finalizado: this.formCadastro.value.finalizado
     }

     //chamar serviço para incluir tarefa
     this.service.post(tarefa).subscribe(
      () => {
        this.mensagem.set('Tarefa cadastrada com sucesso!');
        this.formCadastro.reset();
      }
     );
    } else {
      this.formCadastro.markAllAsTouched();
    }
  }
}
