import { browser, element, by } from 'protractor'
import { expect } from 'chai'
import { pages } from '../../pages/pageObjects'
import { it, assertion } from '../../helpers/decorators'

describe('Suite 2', () => {
  const { googlePage } = pages

  it('CaseID1', 'falling by assertTest 2', async () => {
    await googlePage.getGoogle('STRING PARAM',
     {asd: '12123', sad: {asdas: 'asdas'}, afsf: ['asda', 'asdas']}, element(by.id('main')))
    await browser.sleep(2000)
    await assertion('Check that true is true',
     async () => expect(true).to.equal(false, `True should be true`))
  })

  it('CaseID2', 'falling by error', async () => {
    await googlePage.getGoogle('STRING PARAM',
        {asd: '12123', sad: {asdas: 'asdas'}, afsf: ['asda', 'asdas']}, element(by.id('main')))
    throw new Error('This is error message')
  })
})
