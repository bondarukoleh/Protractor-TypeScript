declare const allure 

function getItCallBackDecorated(testCaseID: string, itName: string, fn: any) {
  return async () => {
    allure.addLabel('testId', testCaseID)
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

const itDecorator: {it: (testCaseID: string, itName: string, fn: any) => void} = {it: null};

itDecorator.it = function (testCaseID: string, itName: string, fn: any) {
  it(itName, getItCallBackDecorated(testCaseID, itName, fn))
}
// @ts-ignore
itDecorator.it.only = function (testCaseID: string, itName: string, fn: any) {
  it.only(itName, getItCallBackDecorated(testCaseID, itName, fn))
}
// @ts-ignore
itDecorator.it.skip = async function (testCaseID: string, itName: string, fn: any) {
  it.skip(itName, getItCallBackDecorated(testCaseID, itName, fn))
}

export {itDecorator}
