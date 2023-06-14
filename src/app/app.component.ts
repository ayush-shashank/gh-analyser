import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { GlobalStateService } from './services/global-state.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  active = 0;
  currentUser: User = {
    name: '',
    login: '',
    avatarUrl: 'https://images.placeholders.dev/?width=500&height=500',
    url: '',
  } as User;

  constructor(
    private settings: SettingsService,
    private gs: GlobalStateService
  ) {
    this.gs.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  async ngOnInit() {
    const restoreStatus = await this.settings.restoreSettings();
    if (restoreStatus === -1) this.getPAT();
    else if (restoreStatus === 0) {
      alert('Token Expired!');
      this.getPAT();
    } else {
      this.gs.isAuth = true;
      this.repoSetup();
    }
  }

  async getPAT() {
    const token = prompt('Enter you Personal Access Token');
    if (token && (await this.settings.isTokenValid(token))) {
      localStorage.setItem('gh-pat', token);
      this.gs.isAuth = true;
      this.settings.selectRepos();
    } else {
      alert('Token Invalid! RELOAD!!');
    }
  }

  selectRepos() {}
  repoSetup() {
    this.settings.selectRepos();
    console.log('repoSetup');
  }
}
