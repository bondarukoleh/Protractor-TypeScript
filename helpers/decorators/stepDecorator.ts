import {ElementFinder} from 'protractor'
import {takeScreenshot, getLoggerInstance} from '../index'
import * as argsParser from 'minimist'

declare const allure: any
const reporter = allure._allure
const ENV_ARGS = argsParser(process.argv.slice(2))

function stepAllure(title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value

    descriptor.value = async function (...args) {
      const originalArgs = args
      const argsWithoutElementFinder = args.filter((el) => !(el instanceof ElementFinder))

      reporter.startStep(title, Date.now())
      argsWithoutElementFinder.forEach((arg, index) => {
        const argument = JSON.stringify(arg)
        allure.createAttachment(`Argument[${index}]`, argument, 'application/json')  
      })

      try {
        const result = await originalFunction.apply(this, originalArgs)
        await takeScreenshot()
        reporter.endStep('passed', Date.now())
        return result
      } catch (e) {
        allure.createAttachment('ERROR', e.toString(), 'text/plain')
        await takeScreenshot('Error')
        if (e.toString().includes('AssertionError')) {
          reporter.endStep('failed', Date.now())
        } else {
          reporter.endStep('broken', Date.now())
        }
        throw e
      }
    }
    return descriptor
  }
}

function stepStub (title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value

    descriptor.value = async function (...args) {
      const originalArgs = args
      const argsWithoutElementFinder = args.filter((el) => !(el instanceof ElementFinder))
      const log = getLoggerInstance({name: 'Page step'})
      log.info('method name: ', originalFunction.name)
      log.info('method args: ', JSON.stringify(argsWithoutElementFinder))

      try {
        return originalFunction.apply(this, originalArgs)
      } catch (e) {
        throw e
      }
    }
    return descriptor
  }
}

export const step = ENV_ARGS.local ? stepStub : stepAllure
