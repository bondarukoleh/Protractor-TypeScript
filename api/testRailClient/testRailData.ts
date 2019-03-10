const credentials = {
  username: 'AutomationTestUser',
  password: 'AutomationTestUserPassword',
};

const host = 'https://some.testrail.com/index.php?/api/v2';

const authorizationHeader = {
  Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
};

enum TestRailStatuses {
  passed = 1,
  blocked = 2,
  untested = 3,
  retest = 4,
  failed = 5,
};

const aplicationID = '1111';

export { credentials, host, authorizationHeader, TestRailStatuses, aplicationID }
