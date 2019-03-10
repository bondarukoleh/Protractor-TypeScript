
/* returns string with random characters */
function makeHash(length = 40, justNumbers = false) {
  let text = '';
  const chars = justNumbers ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

const sleep = async (seconds = 3000) => new Promise((res) => setTimeout(res, seconds));

/*
 EXAMPLE OF USAGE in your tests:
 await waitForCondition(async () => this.getSomeData('My arguments'),
  'returnedData', 5000, 1000, `Failed to get data from some method`)
 */
const waitForCondition = async (functionToExecute, expectedResult, waitTime = 10000,
                                waitInterval = 500, errorMessage = null) => {
  const startTime = +Date.now();
  let executionResult = null;
  do {
    executionResult = await functionToExecute();
    if (executionResult === expectedResult) { return executionResult; }
    await sleep(waitInterval);
  } while ((+Date.now() - startTime) < waitTime);
  const message = errorMessage || `Failed wait for: "${expectedResult}"`;
  throw new Error(`${message} with ${waitTime} ms wait time`);
}

export {waitForCondition, sleep, makeHash}
