import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  constructor(private gh: GithubService) {}

  // async getTopCollaboratorsByCommit(
  //   owner: string,
  //   repo: string,
  //   count: number
  // ) {
  //   const collaborators = await this.gh.getCollaboratorContributions(
  //     owner,
  //     repo
  //   );
  //   return collaborators
  //     .sort((a, b) => a.commitCount - b.commitCount)
  //     .slice(0, Math.min(count, collaborators.length));
  // }

  // async getTopCollaboratorsByPR(owner: string, repo: string, count: number) {
  //   const collaborators = await this.gh.getCollaboratorContributions(
  //     owner,
  //     repo
  //   );
  //   return collaborators
  //     .sort((a, b) => a.prCount - b.prCount)
  //     .slice(0, Math.min(count, collaborators.length));
  // }

  async getTopCollaboratorsByPR(
    owner: string,
    repo: string,
    startDate = new Date(),
    endDate: Date,
    count: number
  ) {
    const collaborators = await this.gh.getContributorByPR(
      owner,
      repo,
      startDate,
      endDate
    );
    let frDist: { login: string; prCount: number }[] = [];
    let frequency =
      this.calculateCollaboratorsFrequency(collaborators).entries();
    for (const [key, value] of frequency) {
      frDist.push({ login: key, prCount: value });
    }
    return frDist
      .sort((a, b) => b.prCount - a.prCount)
      .slice(0, Math.min(count, collaborators.length));
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

  calculateCollaboratorsFrequency(collaborators: User[]): Map<string, number> {
    const frequencyMap = new Map<string, number>();
    for (const user of collaborators) {
      const login = user.login;
      if (frequencyMap.has(login)) {
        frequencyMap.set(login, frequencyMap.get(login)! + 1);
      } else {
        frequencyMap.set(login, 1);
      }
    }
    return frequencyMap;
  }

  async getTopCollaboratorsByCommits(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date,
    count: number
  ) {
    let commits = await this.gh.getRepoCommits(owner, repo, startDate, endDate);
    const collaborators = commits
      .filter((commit) => (commit.author.user ? true : false))
      .map((commit) => commit.author.user!);
    let frDist: { login: string; commitCount: number }[] = [];
    let frequency =
      this.calculateCollaboratorsFrequency(collaborators).entries();
    for (const [key, value] of frequency) {
      frDist.push({ login: key, commitCount: value });
    }
    return frDist
      .sort((a, b) => b.commitCount - a.commitCount)
      .slice(0, Math.min(count, collaborators.length));
  }
}
