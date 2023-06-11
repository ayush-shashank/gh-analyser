export interface IRepoCommitHistoryByContributor {
  repository: {
    refs: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: [
        {
          target: {
            history: {
              nodes: [
                {
                  author: {
                    user: { login: string };
                    date: string;
                  };
                }
              ];
            };
          };
        }
      ];
    };
  };
}
export const RepoCommitHistoryByContributorQuery = `
  query($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      refs(refPrefix: "refs/heads/", first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          target {
            ... on Commit {
              history {
                nodes {
                  author {
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
