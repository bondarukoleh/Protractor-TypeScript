import { configure, getLogger } from 'log4js'

function getLoggerInstance({ name = 'Logger', level = 'info', color = true }) {
  configure({
    appenders: {
      out: {
        type: 'stdout',
        layout: { type: color ? 'coloured' : 'basic' },
      },
    },
    categories: {
      default: {
        appenders: ['out'],
        level,
      },
    },
  });

  return getLogger(name);
}

export { getLoggerInstance }
