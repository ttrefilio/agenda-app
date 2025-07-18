import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';
import { TarefaService } from '../../../core/services/tarefa.service';

@Component({
  selector: 'app-dashboard-tarefas',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard-tarefas.html',
  styleUrl: './dashboard-tarefas.css'
})
export class DashboardTarefas {

  //Atributos
  graficoTarefasPorPrioridade = signal<Chart>(new Chart());
  graficoTarefasPorStatus = signal<Chart>(new Chart());

  dadosPrioridade = signal<{ label: string[], data: number[] }>({ label: [], data: []});
  dadosStatus= signal<{ label: string[], data: number[] }>({ label: [], data: []});

  service = inject(TarefaService);

  ngOnInit() {

    this.service.getAll().subscribe((resposta) => {
      const prioridadeContagem: Record<string, number> = {
        'Alta' : 0,
        'Média' : 0,
        'Baixa' : 0
      };

      let finalizados = 0;
      let pendentes = 0;

      resposta.forEach(tarefa => {
        prioridadeContagem[tarefa.prioridade]++;

        if(tarefa.finalizado) {
          finalizados++;
        }
        else{
          pendentes++;
        }
      });

      this.dadosPrioridade.set({
        label: Object.keys(prioridadeContagem),
        data:Object.values(prioridadeContagem)
      });

      this.dadosStatus.set({
        label: ['Finalizados', 'Pendentes'],
        data: [finalizados, pendentes]
      });

      this.criarGraficoTarefasPorPrioridade();
      this.criarGraficoTarefasPorStatus();
    });
  }

  criarGraficoTarefasPorPrioridade() {
    this.graficoTarefasPorPrioridade.set(new Chart({
      chart: { type : 'column' },
      title: { text: 'Tarefas po Prioridade' },
      xAxis: { categories: this.dadosPrioridade().label },
      yAxis: { title: {text: 'Quantidade'} },
      series: [{
        name: 'Prioridade',
        data: this.dadosPrioridade().data,
        type: 'column'
      }],
      credits: { enabled: false }
    }));
  }

  criarGraficoTarefasPorStatus() {
    this.graficoTarefasPorStatus.set(new Chart({
      chart: { type: 'pie' },
      title: { text: 'Tarefas por Status' },
      plotOptions: {
        pie: {
          innerSize: '50%',
          dataLabels: { enabled: true }
        }
      },
      series: [{
        name: 'Status',
        type: 'pie',
        data: this.dadosStatus().label.map((label, index) => ({
          name: label, y: this.dadosStatus().data[index]
        }))
      }],
      credits: { enabled: false }
    }))
  }
}
