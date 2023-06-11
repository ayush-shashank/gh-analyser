export interface IRepoCommitHistory {
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
              nodes: [{ committedDate: string }];
            };
          };
        }
      ];
    };
  };
}

export const RepoCommitHistoryQuery = `
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
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;
