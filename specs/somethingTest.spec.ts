import {browser} from 'protractor'
import {expect} from 'chai'

describe('Suite 1', () => {
  it('Test 1', async () => {
    await browser.get('/')
    await browser.sleep(2000)
    expect(true).to.equal(true)
  })
})
