export interface Stats {
  forks: number;
  stars: number;
  openIssues: number;
  closedIssues: number;
  openPullRequests: number;
  closedPullRequests: number;
}

export interface StatsQueryResponse {
  repository: {
    forks: {
      totalCount: number;
    };
    stargazers: {
      totalCount: number;
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
    closedPullRequests: {
      totalCount: number;
    };
    closedIssues: {
      totalCount: number;
    };
  };
}
export const StatsQuery = `
  query($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      forks {
        totalCount
      }
      stargazers {
        totalCount
      }
      pullRequests(states: OPEN) {
        totalCount
      }
      issues(states: OPEN) {
        totalCount
      }
      closedPullRequests: pullRequests(states: CLOSED) {
        totalCount
      }
      closedIssues: issues(states: CLOSED) {
        totalCount
      }
    }
  }
`;
