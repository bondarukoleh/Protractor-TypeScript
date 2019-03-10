import * as rp from 'request-promise'
import * as querystring from 'querystring'
import getLogger from '../../helpers/logger'

const commonHeader = { 'Content-Type': 'application/json' }
const log = getLogger({ name: 'Rest client' })

interface IRequest {
  options?: object,
  url: string,
  query?: object
} 

class RestClient {
  public async GET({options, url, query}: IRequest) {
    const optionsToSend = this.prepareOptions({options, method: 'GET', url, query});
    return this.sendRequest(optionsToSend);
  }

  public async POST({options, url}: IRequest) {
    const optionsToSend = this.prepareOptions({options, method: 'POST', url, query: null});
    return this.sendRequest(optionsToSend);
  }

  private async sendRequest(data): Promise<any> {
    try {
      log.info(`Sending request ${JSON.stringify(data)}`);
      const resp = await rp(data);
      return this.responseHandler(resp);
    } catch (e) {
      log.error(`Api call failed with error: ${e}`);
      throw new Error(`Api call failed with error: ${e}`);
    }
  }

  private prepareOptions({options, method, url, query}) {
    options.method = method;
    options.headers = options.headers ? Object.assign(options.headers, commonHeader) : commonHeader;
    options.url = url;
    if (query) {
      // @ts-ignore
      options.url += `?${querystring(query)}`;
    }
    options.json = true;
    return options;
  }

  private responseHandler(response): JSON | string {
    if (response.statusCode && response.statusCode >= 400) {
      log.warn(`Api call status is: ${response.statusCode}, with response: ${response.body}`);
    }
    try {
      return JSON.parse(response);
    } catch (e) {
      return response;
    }
  }
}

export { RestClient }
