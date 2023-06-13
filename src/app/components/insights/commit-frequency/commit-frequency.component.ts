import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-commit-frequency',
  templateUrl: './commit-frequency.component.html',
  styleUrls: ['./commit-frequency.component.scss'],
})
export class CommitFrequencyComponent implements OnInit {
  labels: string[] = [];
  selectedRepos: { owner: string; name: string }[] = [];
  datasets: {
    label: string;
    data: number[];
    borderWidth: number;
    backgroundColor?: any[];
    borderColor?: any[];
  }[] = [];

  constructor(
    private insightsService: InsightsService,
    private gs: GlobalStateService
  ) {
    Chart.register(...registerables);
    this.selectedRepos = [
      { owner: 'facebook', name: 'react' },
      { owner: 'ayush-shashank', name: 'dda' },
    ];
  }

  ngOnInit(): void {
    this.getFrequencies();
  }

  async getFrequencies() {
    let endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);

    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
      const dateString = currentDate.toISOString().slice(0, 10);
      this.labels.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const repo of this.selectedRepos) {
      const frequencies = await this.insightsService.getCommitFrequency(
        repo.owner,
        repo.name,
        startDate,
        endDate
      );

      this.datasets.push({
        label: repo.owner + '/' + repo.name,
        data: frequencies,
        borderWidth: 1,
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
      });
      console.log(frequencies.length);
    }
    this.drawChart();
  }

  drawChart() {
    new Chart('commitFrequency', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
