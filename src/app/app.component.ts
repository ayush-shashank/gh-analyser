import { Component, OnInit } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gh-analyser';
  isAuth = false;

  constructor(private gh: GithubService) {}

  async ngOnInit() {
    const pat = localStorage.getItem('gh-pat');
    if (pat) {
      if (!(await this.gh.verifyPAT(pat))) {
        alert('Token Expired!');
        this.getPAT();
      } else {
        this.isAuth = true;
        this.repoSetup();
      }
    } else {
      this.getPAT();
    }
  }

  async getPAT() {
    const token = prompt('Enter you Personal Access Token');
    if (token && (await this.gh.verifyPAT(token))) {
      localStorage.setItem('gh-pat', token);
      this.isAuth = true;
      this.selectRepos();
    } else {
      alert('Token Invalid!');
      this.getPAT();
    }
  }

  selectRepos() {}
  repoSetup() {
    console.log('respoSetup');
  }
}
