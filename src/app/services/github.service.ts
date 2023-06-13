import { Injectable } from '@angular/core';
import { graphql } from '@octokit/graphql';
import { User, UserQuery } from '../models/user.interface';
import {
  Stats,
  StatsQuery,
  StatsQueryResponse,
} from '../models/repoStats.interface';
import {
  IRepoCommitHistory,
  RepoCommitHistoryQuery,
} from '../models/commitHistory.interface';
import {
  IRepoCommitHistoryByContributor,
  RepoCommitHistoryByContributorQuery,
} from '../models/commitFrequencyByContributor.interface';
import { IRepoPRList, PRListQuery } from '../models/repoPRList.interface';
import {
  CollaboratorContributionQuery,
  ICollaboratorContribution,
} from '../models/collaboratorContribution';
import { BranchesQuery, IBranches } from '../models/branches.interface';
import {
  BranchCommitsQuery,
  IBRanchCommits,
  ICommit,
} from '../models/branchCommits.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private pat = '';
  private gqlWithAuth = graphql;
  user: User | undefined;

  constructor() {}

  verifyPAT(token: string) {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return graphql<{ currentUser: User }>(UserQuery, options)
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
    return this.gqlWithAuth<StatsQueryResponse>(StatsQuery, options).then(
      (response) => {
        const result: Stats = {
          forks: response.repository.forks.totalCount,
          stars: response.repository.stargazers.totalCount,
          openIssues: response.repository.issues.totalCount,
          closedIssues: response.repository.closedIssues.totalCount,
          openPullRequests: response.repository.pullRequests.totalCount,
          closedPullRequests: response.repository.closedPullRequests.totalCount,
        };
        return result;
      }
    );
  }

}
