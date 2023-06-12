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
              pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
              };
              nodes: [
                {
                  committedDate: string;
                }
              ];
            };
          };
        }
      ];
    };
  };
}

export const RepoCommitHistoryQuery = `
  query ($owner: String!, $repo: String!, $perPage: Int!, $cursorRef: String, $cursorHistory: String) {
    repository(owner: $owner, name: $repo) {
      refs(refPrefix: "refs/heads/", first: $perPage, after: $cursorRef) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          target {
            ... on Commit {
              history(first: 100, after: $cursorHistory) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
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
