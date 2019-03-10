import {browser} from 'protractor'
import * as argsParser from 'minimist'

const ENV_ARGS = argsParser(process.argv.slice(2))
declare const allure: any

const stubScreenshot = async function(): Promise<void> { console.log('Stubbed screenshot') }

async function allureScreenshot(title = 'Screenshot') {
  try {
    const png = await browser.takeScreenshot()
    return allure.createAttachment(title, Buffer.from(png, 'base64'), 'image/png')
  } catch (error) {
    if (error.toString().includes('window was already closed')) {
      console.log(`Window was already closed, couldn't make screenshot`)
    }
  }
}

export const takeScreenshot = ENV_ARGS.local ? stubScreenshot : allureScreenshot
