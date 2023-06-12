export interface ICollaboratorContribution {
  repository: {
    collaborators: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: [
        {
          avatarUrl: string;
          login: string;
          contributionsCollection: {
            totalCommitContributions: number;
            totalPullRequestContributions: number;
          };
        }
      ];
    };
  };
}

export const CollaboratorContributionQuery = `
query($owner: String!, $repo: String!, $perPage: Int!, $cursor: String) {
  repository(owner: $owner, name: $repo) {
    collaborators(first: $perPage, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        login
        contributionsCollection{
          totalCommitContributions
          totalPullRequestContributions
        }
      }
    }
  }
}
`;
