import {takeScreenshot} from '../takeScreenshot'

const {SPEC_REPORTER} = process.env
declare const allure: any

async function assertionStub(title: string, fn: () => any) {
  await fn()
}
async function assertionAllure(title: string, fn: () => any) {
  const reporter = allure._allure
  try {
    reporter.startStep(title, Date.now())
    await fn()
    reporter.endStep('passed', Date.now())
  } catch (e) {
    await takeScreenshot('ASSERTION ERROR')
    reporter.endStep('failed', Date.now())
    throw e
  }
}

export const assertion = SPEC_REPORTER ? assertionStub : assertionAllure
