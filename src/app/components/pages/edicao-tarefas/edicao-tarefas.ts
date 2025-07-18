import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefaService } from '../../../core/services/tarefa.service';
import { ActivatedRoute } from '@angular/router';
import { TarefaModel } from '../../../core/models/tarefa.model';


@Component({
  selector: 'app-edicao-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-tarefas.html',
  styleUrl: './edicao-tarefas.css'
})
export class EdicaoTarefas {


  //atributos
  formEdicao!: FormGroup;
  prioridades: string[] = ['Baixa', 'Média', 'Alta'];
  mensagem = signal<string>('');


  //injeção de dependências
  private service = inject(TarefaService);
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);


  //ao criar o componente
  ngOnInit() {
    //construindo o formulário reativo
    this.formEdicao = this.fb.group({
      id: [''], //Armazenar o ID da tarefa para edição
      nome: ['', [Validators.required, Validators.minLength(6)]],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      prioridade: ['', [Validators.required]],
      finalizado: [false]
    });

    //Capturando ID na rota
    const id = this.activatedRoute.snapshot.params['id'];

    //Consultando tarefa pelo ID
    this.service.getById(id).subscribe((tarefa) => {
      //preenchendo o formulario com os dados da tarefa
      this.formEdicao.patchValue(tarefa);
    })
  }

  //evento de submit do formulario
    onSubmit() {
      if (this.formEdicao.valid) {
       const tarefa: TarefaModel = {
        id: this.formEdicao.value.id,
        nome: this.formEdicao.value.nome,
        data: this.formEdicao.value.data,
        hora: this.formEdicao.value.hora,
        prioridade: this.formEdicao.value.prioridade,
        finalizado: this.formEdicao.value.finalizado
       }

       //chamar serviço para incluir tarefa
       this.service.put(tarefa).subscribe(
        () => {
          this.mensagem.set('Tarefa atualizada com sucesso!');
        }
       );
      } else {
        this.formEdicao.markAllAsTouched();
      }
    }
}
