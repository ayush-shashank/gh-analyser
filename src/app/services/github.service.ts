import { Injectable } from '@angular/core';
import { graphql } from '@octokit/graphql';
import {
  BranchCommitsQuery,
  IBRanchCommits,
  ICommit,
} from '../models/branchCommits.interface';
import { BranchesQuery, IBranches } from '../models/branches.interface';
import {
  IRepoCommitHistoryByContributor,
  RepoCommitHistoryByContributorQuery,
} from '../models/commitFrequencyByContributor.interface';
import { IRepoPRList, PRListQuery } from '../models/repoPRList.interface';
import {
  Stats,
  StatsQuery,
  StatsQueryResponse,
} from '../models/repoStats.interface';
import { User, UserQuery } from '../models/user.interface';
import { GlobalStateService } from './global-state.service';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private pat = '';
  private gqlWithAuth = graphql;
  user: User | undefined;

  constructor(private gs: GlobalStateService) {}

  verifyPAT(token: string) {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    return graphql<{ currentUser: User }>(UserQuery, options)
      .then((response) => {
        this.gs.personalAccessToken.next(token);
        this.gqlWithAuth = graphql.defaults(options);
        this.gs.currentUser.next(response.currentUser);
        this.gs.isAuth = true;
        return true;
      })
      .catch((_) => false);
  }

  getRepo(owner: string, repo: string) {
    const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        viewerPermission
      }
    }
  `;
    const options = { owner, repo };
    return this.gqlWithAuth<{ repository: { viewerPermission: string } }>(
      query,
      options
    )
      .then((response) => {
        const viewerPermission = response.repository.viewerPermission;
        if (viewerPermission === 'READ' || viewerPermission === 'ADMIN') {
          console.log('Read access is granted to the repository.');
          return true;
        } else {
          console.log('Read access is not granted to the repository.');
          return false;
        }
      })
      .catch((err) => {
        console.error('Failed to check read access:', err.message);
        return false;
      });
  }

  async getBranches(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date
  ) {
    const options: {
      owner: string;
      repo: string;
      cursor: string | null;
      startDate: Date;
      endDate: Date;
    } = {
      owner,
      repo,
      cursor: null,
      startDate, //: startDate.toISOString(),
      endDate, //: endDate.toISOString(),
    };
    let branches: string[] = [];
    let hasNextPage = true;
    while (hasNextPage) {
      try {
        const response = await this.gqlWithAuth<IBranches>(
          BranchesQuery,
          options
        );
        branches = response.repository.branches.nodes
          .filter((branch) => branch.target.history.totalCount > 0)
          .map((branch) => branch.name)
          .concat(branches);
        hasNextPage = response.repository.branches.pageInfo.hasNextPage;
        options.cursor = response.repository.branches.pageInfo.endCursor;
      } catch (error) {
        console.error('Unable to fetch branches', error);
        break;
      }
    }
    return branches;
  }

  async getBranchCommits(
    owner: string,
    repo: string,
    branchName: string,
    startDate: Date,
    endDate: Date
  ) {
    const options: {
      owner: string;
      repo: string;
      branchName: string;
      startDate: Date;
      endDate: Date;
      cursor: string | null;
    } = {
      owner,
      repo,
      branchName,
      startDate,
      endDate,
      cursor: null,
    };
    let commits: ICommit[] = [];
    let hasNextPage = true;
    while (hasNextPage) {
      try {
        const response = await this.gqlWithAuth<IBRanchCommits>(
          BranchCommitsQuery,
          options
        );
        commits = response.repository.branch.target.history.nodes
          .map((commit) => commit)
          .concat(commits);
        hasNextPage =
          response.repository.branch.target.history.pageInfo.hasNextPage;
        options.cursor =
          response.repository.branch.target.history.pageInfo.endCursor;
      } catch (error) {
        console.error('Unable to fetch commits', error);
        break;
      }
    }
    return commits;
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

  async getRepoCommits(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date
  ) {
    let repoCommits: ICommit[] = [];
    const branches = await this.getBranches(owner, repo, startDate, endDate);
    for (const branch of branches) {
      const commits = await this.getBranchCommits(
        owner,
        repo,
        branch,
        startDate,
        endDate
      );
      repoCommits = commits.concat(repoCommits);
    }
    return repoCommits;
  }

  async getContributorByCommits(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date
  ) {
    let branchCursor: string | null = null;
    let commitCursor: string | null = null;
    const options = {
      owner,
      repo,
      branchCursor,
      commitCursor,
      startDate,
      endDate,
    };
    let contributors: User[] = [];
    while (branchCursor) {
      while (commitCursor) {
        let response: IRepoCommitHistoryByContributor;
        try {
          response = await this.gqlWithAuth<IRepoCommitHistoryByContributor>(
            RepoCommitHistoryByContributorQuery,
            options
          );
          response.repository.branches.nodes
            .flatMap((node) =>
              node.target.history.nodes
                .filter((commit) => (commit.author.user ? true : false))
                .map((n) => {
                  let user: User = {
                    name: n.author.name,
                    avatarUrl: n.author.avatarUrl,
                    login: n.author.user!.login,
                  };
                  return user;
                })
            )
            .concat(contributors);
          // options.commitCursor =
        } catch (error) {
          console.error('GET Commit Frequency Failed');
        }
      }
    }
  }

  async getContributorByPR(
    owner: string,
    repo: string,
    startDate: Date,
    endDate: Date
  ) {
    const options: { owner: string; repo: string; cursor: string | null } = {
      owner,
      repo,
      cursor: null,
    };
    let hasNextPage = true;
    let contributors: User[] = [];
    let pageCount = 100;
    while (hasNextPage && pageCount === 100) {
      try {
        let response = await this.gqlWithAuth<IRepoPRList>(
          PRListQuery,
          options
        );
        let pagePR = response.repository.pullRequests.nodes.filter((pr) => {
          const prDate = new Date(pr.createdAt);
          return startDate < prDate && prDate <= endDate;
        });
        contributors = pagePR.map((pr) => pr.author).concat(contributors);
        pageCount = pagePR.length;
        hasNextPage = response.repository.pullRequests.pageInfo.hasNextPage;
        options.cursor = response.repository.pullRequests.pageInfo.endCursor;
      } catch (error) {
        console.error('GET PR List Failed');
      }
    }
    return contributors;
  }

  // async getCollaboratorContributions(owner: string, repo: string) {
  //   const options: {
  //     owner: string;
  //     repo: string;
  //     perPage: number;
  //     cursor: string | null;
  //   } = {
  //     owner,
  //     repo,
  //     perPage: 100,
  //     cursor: null,
  //   };

  //   let hasNextPage = true;
  //   const collaborators: {
  //     user: User;
  //     commitCount: number;
  //     prCount: number;
  //   }[] = [];
  //   let i = 0;
  //   while (hasNextPage) {
  //     console.log('loop', ++i);
  //     try {
  //       let response = await this.gqlWithAuth<ICollaboratorContribution>(
  //         CollaboratorContributionQuery,
  //         options
  //       );
  //       for (const collaborator of response.repository.collaborators.nodes) {
  //         let user: User = {
  //           name: collaborator.name,
  //           avatarUrl: collaborator.avatarUrl,
  //           login: collaborator.login,
  //         };
  //         collaborators.push({
  //           user,
  //           commitCount:
  //             collaborator.contributionsCollection.totalCommitContributions,
  //           prCount:
  //             collaborator.contributionsCollection.totalCommitContributions,
  //         });
  //         hasNextPage = response.repository.collaborators.pageInfo.hasNextPage;
  //         options.cursor = response.repository.collaborators.pageInfo.endCursor;
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch top collaborators:', error);
  //       break;
  //     }
  //   }
  //   return collaborators;
  // }
}
