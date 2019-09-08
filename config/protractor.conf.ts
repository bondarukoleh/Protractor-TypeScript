import {browser, Config} from 'protractor'
import * as minimist from 'minimist'

const {SPEC_REPORTER, SELENIUM_ADDRESS} = process.env
const ENV_ARGS = minimist(process.argv.slice(2))

const config: Config = {
  seleniumAddress: SELENIUM_ADDRESS ? SELENIUM_ADDRESS : 'http://localhost:4444/wd/hub',
  // seleniumSessionId: ,
  // a bug in protractor, either webdriver-manager@13 or direct
  // https://github.com/angular/protractor/issues/5225
  directConnect: !!ENV_ARGS.direct,
  framework: 'mocha',
  mochaOpts: {
    timeout: 350 * 1000,
    fullTrace: true,
    reporter: SPEC_REPORTER ? 'spec' : 'mocha-allure-reporter'
  },
  specs: ['./specs/**/*.spec.*'],
  baseUrl: 'http://www.google.com',
  allScriptsTimeout: 30 * 1000,
  multiCapabilities: [
    {
      browserName: 'chrome',
      maxInstances: 2,
      shardTestFiles: true,
      version: '70',
      chromeOptions: {
        args: [
          '--disable-gpu',
          '--disable-gpu-program-cache',
          '--disable-gpu-shader-disk-cache',
          '--process-per-tab',
          '--process-per-site'
        ]
      }
    },
    // {
    //   browserName: 'firefox',
    //   maxInstances: 1,
    //   shardTestFiles: true,
    //   version: '63',
    //   'moz:firefoxOptions': {
    //     prefs: {
    //       'browser.download.folderList': 2,
    //       'browser.download.manager.showWhenStarting': false,
    //       'browser.helperApps.alwaysAsk.force': false,
    //       'browser.download.manager.useWindow': false,
    /* tslint:disable */
    //       'browser.helperApps.neverAsk.saveToDisk': 'application/octet-stream, application/msword, application/json, text/comma-separated-values, text/csv, text/tab-delimited-values, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext, text/plaintext, application/x-www-form-urlencoded, application/xlsx, binary/octet-stream, text/binary, application/zip, application/rtf, image/png, image/jpeg, application/pdf'
    /* tslint:enable */
    //     }
    //   }
    // }
  ],
  logLevel: 'ERROR',
  SELENIUM_PROMISE_MANAGER: false, // Needed to make async/await work. Disables control flow.
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false)
    await browser.manage().window().maximize()
    browser.ignoreSynchronization = true; // Don't wait for angular finish work
  },
}

export {config}
