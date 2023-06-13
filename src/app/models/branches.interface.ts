export interface IBranches {
  repository: {
    branches: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: [
        {
          name: string;
          target: {
            history: {
              totalCount: number;
            };
          };
        }
      ];
    };
  };
}

export const BranchesQuery = `
query ($owner: String!, $repo: String!, $startDate: GitTimestamp!, $endDate: GitTimestamp!, $branchCursor: String) {
  repository(owner: $owner, name: $repo) {
    branches: refs(refPrefix: "refs/heads/", first: 100, after: $branchCursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        target {
          ... on Commit {
            history(since: $startDate, until: $endDate) {
              totalCount
            }
          }
        }
      }
    }
  }
}
`
