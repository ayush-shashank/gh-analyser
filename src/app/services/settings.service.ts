import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { GlobalStateService } from './global-state.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  selectedRepos: { owner: string; name: string }[] = [];

  constructor(private gh: GithubService, private gs: GlobalStateService) {
    this.gs.selectedRepos.subscribe((repos) => {
      this.selectedRepos = repos;
    });
  }

  async restoreSettings() {
    const pat = localStorage.getItem('gh-pat');
    if (!pat) return -1;
    if (!(await this.gh.verifyPAT(pat))) return 0;
    const repos = localStorage.getItem('repos')?.split(',');
    if (repos) {
      this.selectedRepos = repos.map((repo) => {
        const owner_repo = repo.split('/');
        return {
          owner: owner_repo[0],
          name: owner_repo[1],
        };
      });
    }
    return 1;
  }

  async isTokenValid(token: string) {
    return this.gh.verifyPAT(token);
  }

  selectRepos() {}

  async addRepoToList(owner: string, name: string) {
    let res = await this.gh.getRepo(owner, name);
    console.log(res);
    if (!res) {
      alert('Cannot access the repository!');
    }
    this.selectedRepos.push({ owner, name });
    this.gs.selectedRepos.next(this.selectedRepos);
  }
}
