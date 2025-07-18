export interface TarefaModel {
  id: string;
  nome: string;
  data: string;
  hora: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  finalizado: boolean;
}
