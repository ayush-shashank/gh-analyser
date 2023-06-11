import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  avatar_url = 'https://images.placeholders.dev/?width=500&height=500';
  username = 'sdkfjbdskfjhdsjkh';
  isAuth = false;

  constructor(private settings: SettingsService) {}

  async ngOnInit() {
    const restoreStatus = await this.settings.restoreSettings();
    if (restoreStatus === -1) this.getPAT();
    else if (restoreStatus === 0) {
      alert('Token Expired!');
      this.getPAT();
    } else {
      this.isAuth = true;
      this.repoSetup();
    }
  }

  async getPAT() {
    const token = prompt('Enter you Personal Access Token');
    if (token && (await this.settings.isTokenValid(token))) {
      localStorage.setItem('gh-pat', token);
      this.isAuth = true;
      this.settings.selectRepos();
    } else {
      alert('Token Invalid!');
      this.getPAT();
    }
  }

  selectRepos() {}
  repoSetup() {
    this.settings.selectRepos();
    console.log('repoSetup');
  }
}
