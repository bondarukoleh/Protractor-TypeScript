import { browser, element, by } from 'protractor'
import { expect } from 'chai'
import { pages } from '../pages/pageObjects'
import { itDecorator } from '../helpers/decorators' 

describe('Suite 1', () => {

  const { googlePage } = pages
  const { it } = itDecorator

  it('Case ID 1', 'Test 1', async () => {
    await googlePage.getGoogle('STRING PARAM',
     {asd: '12123', sad: {asdas: 'asdas'}, afsf: ['asda', 'asdas']}, element(by.id('main')))
    await browser.sleep(2000)
    expect(true).to.equal(true)
  })
})
