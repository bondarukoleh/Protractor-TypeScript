import { browser, element, by } from 'protractor'
import { step } from '../helpers'

class SomePage {
  @step(`Getting Google`)
  public async getGoogle(parametr, o, el) {
    await browser.get('/')
    // await element(by.id('asda')).click()
  }
}

export { SomePage }
