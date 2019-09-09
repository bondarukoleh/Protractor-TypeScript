declare const allure
const { SPEC_REPORTER } = process.env

function getItCallBackDecorated(testCaseID: string, itName: string, fn: any) {
  return async () => {
    if (!SPEC_REPORTER) { allure.addLabel('testId', testCaseID) }
    try {
      await fn()
    } catch (e) {
      if (e.name === 'AssertionError') {
        console.log(`CASE_TITLE:[AssertionError]`)
      } else {
        console.log(`CASE_TITLE:[${itName}]`)
      }
      throw e
    }
  }
}

type ItType = (testCaseID: string, itName: string, fn: any) => any
interface ITestDecorator {
  (testCaseID: string, itName: string, fn: any): any
  only: ItType
  skip: ItType
}

const itDecorated = (function (testCaseID, itName, fn) {
  it(itName, getItCallBackDecorated(testCaseID, itName, fn))
}) as ITestDecorator

itDecorated.only = function (testCaseID: string, itName: string, fn: any) {
  it.only(itName, getItCallBackDecorated(testCaseID, itName, fn))
}

itDecorated.skip = function (testCaseID: string, itName: string, fn: any) {
  it.skip(itName, getItCallBackDecorated(testCaseID, itName, fn))
}

export { itDecorated as it }
