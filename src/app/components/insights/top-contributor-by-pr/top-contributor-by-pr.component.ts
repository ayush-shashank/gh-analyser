import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-top-contributor-by-pr',
  templateUrl: './top-contributor-by-pr.component.html',
  styleUrls: ['./top-contributor-by-pr.component.scss'],
})
export class TopContributorByPRComponent implements OnInit {
  top = 10;
  startDate = new Date();
  endDate = new Date();
  selectedRepos: {
    owner: string;
    name: string;
    // contributors?: { contributorDetails: User; prCount: number }[];
    contributors?: { login: string; prCount: number }[];
  }[] = [];

  constructor(
    private insightsService: InsightsService,
    private gs: GlobalStateService
  ) {
    this.selectedRepos = this.gs.selectedRepos;
  }

  ngOnInit() {
    this.getContributors();
  }

  getContributors() {
    this.endDate.setMonth(new Date().getMonth() - 6);
    this.selectedRepos.map(async (repo) => {
      repo.contributors = await this.insightsService.getTopCollaboratorsByPR(
        repo.owner,
        repo.name,
        this.startDate,
        this.endDate,
        this.top,
      );
      return repo;
    });
  }
}
