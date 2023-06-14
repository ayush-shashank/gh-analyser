import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/models/repoStats.interface';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss'],
})
export class ComparisonTableComponent implements OnInit {
  selectedRepos: { owner: string; name: string; stats?: Stats }[] = [];
  constructor(
    private insightsService: InsightsService,
    private gs: GlobalStateService
  ) {
    this.gs.selectedRepos.subscribe((repos) => {
      this.selectedRepos = repos;
    });
  }
  ngOnInit() {
    this.getStats();
  }

  getStats() {
    console.log(this.selectedRepos);
    this.selectedRepos.map(async (repo) => {
      this.insightsService
        .getStats(repo.owner, repo.name)
        .then((stats) => {
          repo.stats = stats;
          return repo;
        })
        .catch((err) => console.error('GET Stats Failed', err));
    });
  }
}
