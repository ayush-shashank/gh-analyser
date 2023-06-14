import { Component } from '@angular/core';
import { start } from '@popperjs/core';
import { GithubService } from 'src/app/services/github.service';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent {
  active = 0;
  constructor(
    private insightService: InsightsService,
    private gh: GithubService
  ) {
    this.getInsights();
  }

  async getInsights() {
    // this.insightService.getTopCollaboratorsByCommit(this.owner, this.repo, 10);
    // this.insightService.getTopCollaboratorsByPR(this.owner, this.repo, 10);

    // this.insightService.getCommitFrequency(
    //   this.owner,
    //   this.repo,
    //   new Date(),
    //   new Date()
    // );
    let endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);
  }
}
