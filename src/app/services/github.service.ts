import { Injectable } from '@angular/core';
import { graphql } from '@octokit/graphql';
import { IUser, UserQuery } from '../models/user.interface';
import { IRepoStats, StatsQuery } from '../models/repoStats.interface';
import {
  IRepoCommitHistory,
  RepoCommitHistoryQuery,
} from '../models/commitHistory.interface';
import {
  IRepoCommitHistoryByContributor,
  RepoCommitHistoryByContributorQuery,
} from '../models/commitFrequencyByContributor.interface';
import { IRepoPRList, PRListQuery } from '../models/repoPRList.interface';

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

  getStats(owner: string, repo: string) {
    const options = { owner, repo };
    return this.gqlWithAuth<IRepoStats>(StatsQuery, options)
      .then((response) => {
        return response.repository;
      })
      .catch((_) => console.error('GET Stats Failed'));
  }

  getCommitHistory(owner: string, repo: string) {
    const options = { owner, repo };
    return this.gqlWithAuth<IRepoCommitHistory>(RepoCommitHistoryQuery, options)
      .then((response) => {
        return response.repository;
      })
      .catch((_) => console.error('GET Commit History Failed'));
  }

  getCommitFrequency(owner: string, repo: string) {
    const options = { owner, repo };
    return this.gqlWithAuth<IRepoCommitHistoryByContributor>(
      RepoCommitHistoryByContributorQuery,
      options
    )
      .then((response) => {
        return response.repository;
      })
      .catch((_) => console.error('GET Commit Frequency Failed'));
  }

  getRepoPRList(owner: string, repo: string) {
    const options = { owner, repo };
    return this.gqlWithAuth<IRepoPRList>(PRListQuery, options)
      .then((response) => {
        return response.pullRequests;
      })
      .catch((_) => console.error('GET PR List Failed'));
  }
}
