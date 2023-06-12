import { Injectable } from '@angular/core';
import { GithubService } from './github.service';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  constructor(private gh: GithubService) {}

  getTop10CollaboratorsByCommit(owner: string, repo: string) {
    const collaborators = this.gh.getCollaboratorContributions(owner, repo);
    return collaborators
      .sort((a, b) => a.commitCount - b.commitCount)
      .slice(0, Math.min(10, collaborators.length));
  }

  getTop10CollaboratorsByPR(owner: string, repo: string) {
    const collaborators = this.gh.getCollaboratorContributions(owner, repo);
    return collaborators.sort((a, b) => a.prCount - b.prCount).slice(0, 10);
  }

  getCommitFrequency(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date
  ) {
    let frDist: { [x: string]: number } = {};
    this.gh
      .getCommitHistory(owner, repo, startDate, endDate)
      .then((response) => {
        let dates = response.map((date) => date.toISOString().slice(0, 10));
        for (let i = 0; i < dates.length; ++i) {
          let d = dates[i];
          if (frDist[d]) {
            frDist[d]++;
          } else {
            frDist[d] = 1;
          }
        }
        return frDist;
      });
  }

  getStats(owner: string, repo: string) {
    return this.gh.getStats(owner, repo);
  }
}
