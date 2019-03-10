import { browser, element, by } from 'protractor'
import { expect } from 'chai'
import { pages } from '../pages/pageObjects'

describe('Suite 1', () => {

  const { googlePage } = pages

  it('Test 1', async () => {
    await googlePage.getGoogle('STRING PARAM',
     {asd: '12123', sad: {asdas: 'asdas'}, afsf: ['asda', 'asdas']}, element(by.id('main')))
    await browser.sleep(2000)
    expect(true).to.equal(true)
  })
})
