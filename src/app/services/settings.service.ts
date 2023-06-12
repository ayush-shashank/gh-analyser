import { Injectable } from '@angular/core';
import { GithubService } from './github.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  username: string = '';
  repos: number[] = [];

  constructor(private gh: GithubService) {}

  async restoreSettings() {
    const pat = localStorage.getItem('gh-pat');
    if (!pat) return -1;
    if (!(await this.gh.verifyPAT(pat))) return 0;
    const repos = localStorage.getItem('repos')?.split(',');
    if (repos) this.repos = repos.map(Number);
    return 1;
  }

  async isTokenValid(token: string) {
    return this.gh.verifyPAT(token);
  }

  checkAccess() {}
  selectRepos() {
    // this.gh.getCommitFrequency('ayush-shashank', 'dda');
    // this.gh.getCommitHistory('ayush-shashank', 'dda');
    // this.gh.getRepoPRList('ayush-shashank', 'CAPD-Project');
    // this.gh.getStats('ayush-shashank', 'dda');
  }

  addRepoToList(owner: string, repo: string) {
    let res = this.gh.getRepo(owner, repo);
    console.log(res);
  }
}
