export interface IRepoStats {
  repository: {
    fork: {
      totalCount: 0;
    };
    stargazers: {
      totalCount: 0;
    };
    pullRequests: {
      totalCount: 0;
    };
    issues: {
      totalCount: 0;
    };
    closedPullRequests: {
      totalCount: 0;
    };
    closedIssues: {
      totalCount: 0;
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
