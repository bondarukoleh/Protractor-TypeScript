import { configure, getLogger } from 'log4js'

export default function getLoggerInstance({ name = 'Logger', level = 'info', color = true }) {
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
