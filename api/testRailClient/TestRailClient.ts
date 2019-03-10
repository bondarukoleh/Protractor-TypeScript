import { RestClient } from '../restClient'
import { host, authorizationHeader, TestRailStatuses, aplicationID } from './testRailData'
import { getLoggerInstance } from '../../helpers'

const log = getLoggerInstance({ name: 'Test rail client' })

class TestRailClient {

  private restClient: any

  constructor() {
    this.restClient = new RestClient();
  }

  public async updateCaseStatus({ state, caseID }) {
    log.info(`Updating case number: "${caseID}" with status: "${status}"`)
    return this.addResultForCase(aplicationID, caseID, {
      status_id: TestRailStatuses[state],
      comment: 'Case updated by automation run',
    });
  }

  private async addResultForCase(runId, caseId, data) {
    return this.restClient.POST({
      headers: authorizationHeader,
      body: data,
    }, `${host}/add_result_for_case/${runId}/${caseId}`);
  }
}

export { TestRailClient }
