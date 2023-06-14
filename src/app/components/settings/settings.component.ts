import { Component } from '@angular/core';
import { GlobalStateService } from 'src/app/services/global-state.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  pat = '';
  repoLink = '';
  selectedRepos: { owner: string; name: string }[] = [];

  constructor(
    private settings: SettingsService,
    private gs: GlobalStateService
  ) {
    this.gs.personalAccessToken.subscribe((token) => {
      this.pat = token;
    });
    this.gs.selectedRepos.subscribe((repos) => {
      this.selectedRepos = repos;
    });
  }

  async setNewToken() {
    let result = await this.settings.isTokenValid(this.pat);
    result ? alert('Token Updated.') : alert('Invalid Token!');
  }

  selectRepos() {}

  // changeSelect($event: any) {
  //   let i = this.selectedRepos.findIndex((repo) => repo.name == $event.target.value);
  //   this.selectedRepos[i].selected = $event.target.checked ? true : false;
  // }

  removeRepo(i: number) {
    console.log('splice');
    this.selectedRepos.splice(i, 1);
    this.gs.selectedRepos.next(this.selectedRepos);
    localStorage.setItem(
      'repos',
      this.selectedRepos.map((repo) => `${repo.owner}/${repo.name}`).join(',')
    );
  }

  extractRepoFromLink(url: string) {
    const regex = /github.com\/([^/]+)\/([^/]+)/;
    const match = url.match(regex);

    if (match) {
      const owner = match[1];
      const name = match[2];
      return { owner, name };
    }
    return null;
  }

  addRepo() {
    const result = this.extractRepoFromLink(this.repoLink);
    if (!result) {
      alert('Invalid URL!');
      return;
    }
    console.log(result.owner, result.name);
    this.settings.addRepoToList(result.owner, result.name);
    this.repoLink = '';
  }
}
