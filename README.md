# GitHub Multi-Repo Analyzer

Angular Application to fulfill the problem statement.

## Problem Statement

- Check local storage if the website has any data saved:
  1. If there is data saved,
     1. Use the GitHub token and list of repositories from there
     2. Based on the validity of the GitHub token, check for access status of all repos
  2. If there is no data saved:
     1. Ask the user for a give token
     2. Ask the user for a list of GitHub repos
     3. Save it in local storage

- For the dashboard, We have two tabs

  1. Tab 1 is called "Insights"
  The following components are to be displayed as a grid layout on the insights tab.
     1. Display the top 10 contributors for all repos by PR's
     2. Display the top 10 contributors for all repos by commits
     3. Display a line chart indicating the code commit frequency for all repos being monitored, have one line per repo for a period of 6 months
     4. Display a comparison table for all repos, based on, Forks, stars, open PR's, open Issues, closed PR's and closed issues

  2. Tab 2 is called "Settings"
     Present the following there:
     1. Is the token provided
     2. For each of the repo listed, can we connect to it and do we have read rights to it
     3. Option to change the token and add/delete github repos

## Pointers

- Use a flexible grid layout to show/hide the components in the insights tab if possible.
- Use this webpage as a sample for the same : <https://terminal.sexy/> (<https://github.com/stayradiated/terminal.sexy>)
- You can use this node module for getting GitHub insights: <https://www.npmjs.com/package/github-api>
- Validation of user provided data is required
