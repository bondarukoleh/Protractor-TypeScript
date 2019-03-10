import * as JiraApi from 'jira-client'
import * as fs from 'fs'
import * as path from 'path'

enum IssueInfoEnum {
  description = 'description',
  acceptanceCriteris = 'customfield_10030'
}

class JiraApiClient {
  private jiraClientInstance: JiraApi

  constructor({host, username, password}) {
    this.jiraClientInstance = this.initializeJiraClient({host, username, password})
  }

  public async getIssue(issueNumber: string): Promise<any> {
    return this.jiraClientInstance.findIssue(issueNumber)
  }

  public async getIssueField({issueNumber, fieldName}: {issueNumber: string, fieldName: IssueInfoEnum}): Promise<any> {
    const issue = this.getIssue(issueNumber)
    return issue[fieldName]
  }

  private initializeJiraClient({host, username, password}): JiraApi {
    return new JiraApi({
      protocol: 'https',
      host,
      username,
      password,
      apiVersion: '2',
      strictSSL: true
    })
  }
}

export { JiraApiClient, IssueInfoEnum }

const issueID = 'someIssueID';
const jiraClient = new JiraApiClient({host: 'host', username: 'username', password: 'password'})

const getIssue = async function (issue: string): Promise<void> {
  const gotIssue = await jiraClient.getIssue(issue)
  const pathToFile = path.resolve(process.cwd(), `./${issue}.json`)
  fs.writeFileSync(pathToFile, JSON.stringify(gotIssue))
}
// getIssue(issueID);
