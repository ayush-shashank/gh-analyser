import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { InsightsService } from 'src/app/services/insights.service';

@Component({
  selector: 'app-top-contributor-by-commit',
  templateUrl: './top-contributor-by-commit.component.html',
  styleUrls: ['./top-contributor-by-commit.component.scss'],
})
export class TopContributorByCommitComponent implements OnInit {
  top = 10;
  selectedRepos: {
    owner: string;
    name: string;
    // contributors?: { contributorDetails: User; prCount: number }[];
    contributors?: { login: string; commitCount: number }[];
  }[] = [];

  constructor(
    private insightsService: InsightsService,
    private gs: GlobalStateService
  ) {
    this.gs.selectedRepos.subscribe((repos) => {
      this.selectedRepos = repos;
    });
  }
  ngOnInit() {
    this.getContributors();
  }
  getContributors() {
    console.log(this.selectedRepos);
    const endDate = new Date();
    let startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 3);
    this.selectedRepos.map(async (repo) => {
      console.log(`${repo.owner}/${repo.name}`);

      this.selectedRepos.map(async (repo) => {
        repo.contributors =
          await this.insightsService.getTopCollaboratorsByCommits(
            repo.owner,
            repo.name,
            startDate,
            endDate,
            this.top
          );
        return repo;
      });
    });
  }
}
