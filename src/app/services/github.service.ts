import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  // baseUrl = `https://api.github.com`;
  pat = '';
  isPATValid = false;
  gh: Octokit | undefined = undefined;

  constructor(private http: HttpClient) {}

  setAccessToken(token: string) {
    this.pat = token;
  }

  initOctokit() {
    this.gh = new Octokit({
      auth: this.pat,
      log: console,
    });
  }

  verifyPAT(token: string) {
    const octo = new Octokit({ auth: token });
    return octo.users
      .getAuthenticated()
      .then((response) => {
        this.pat = token;
        this.gh = new Octokit({ auth: token });
        console.log(response.data.login);
        return true;
      })
      .catch((_) => false);
  }
}
