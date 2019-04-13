import { browser, element, by } from 'protractor'
import { expect } from 'chai'
import { pages } from '../pages/pageObjects'
import { itDecoration, assertion } from '../helpers/decorators'

describe('Suite 1', () => {
  const { googlePage } = pages
  const { it } = itDecoration

  it('CaseID1', 'Test 1', async () => {
    await googlePage.getGoogle('STRING PARAM',
     {asd: '12123', sad: {asdas: 'asdas'}, afsf: ['asda', 'asdas']}, element(by.id('main')))
    await browser.sleep(2000)
    await assertion('Check that true is true',
     async () => expect(false).to.equal(true, `True should be ture`))
  })
})
