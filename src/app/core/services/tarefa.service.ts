import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TarefaModel } from '../models/tarefa.model';
import { delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private endpoint = environment.apiBaseUrl + '/tarefas'
  private http = inject(HttpClient);

  post(tarefa: TarefaModel) {
    return this.http.post<TarefaModel>(this.endpoint, tarefa)
  }

  put(tarefa: TarefaModel) {
    return this.http.put<TarefaModel>(this.endpoint + '/' + tarefa.id, tarefa)
  }

  delete(id: string) {
    return this.http.delete<TarefaModel>(this.endpoint + '/' + id)
  }

  getAll() {
    return this.http
      .get<TarefaModel[]>(this.endpoint).pipe(delay(3000)); // remover pipe(delay)
  }

  getById(id: string) {
    return this.http
      .get<TarefaModel>(this.endpoint + '/' + id); // remover pipe(delay)
  }
}
