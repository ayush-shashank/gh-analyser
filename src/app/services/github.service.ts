import { Injectable } from '@angular/core';
import { graphql } from '@octokit/graphql';
import { IUser, UserQuery } from '../models/user.interface';


@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private pat = '';
  private gqlWithAuth = graphql;
  user: IUser | undefined;

  constructor() {}

  verifyPAT(token: string) {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return graphql<{ currentUser: IUser }>(UserQuery, options)
      .then((response) => {
        this.pat = token;
        this.gqlWithAuth = graphql.defaults(options);
        this.user = response.currentUser;
        return true;
      })
      .catch((_) => false);
  }
}
