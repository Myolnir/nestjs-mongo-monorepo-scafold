import { createLogger } from 'bunyan';
import { getNamespace } from 'cls-hooked';

import loggerConfig from './logger.config';

const bunyanLogger = createLogger({
  level: process.env.LOG_LEVEL,
  streams: loggerConfig.streams,
  name: `${process.env.SERVICE}-module`,
  src: true,
});

const getReqId = () => {
  const myRequest = getNamespace('personalizedRequest');
  return myRequest && myRequest.get('reqId') ? { req_id: myRequest.get('reqId') } : {};
};

export const logger = {
  error(message, any = null) {
    bunyanLogger.fields = { ...bunyanLogger.fields, ...getReqId() };
    bunyanLogger.error(any, message);
  },
  warn(message, any = null) {
    bunyanLogger.fields = { ...bunyanLogger.fields, ...getReqId() };
    bunyanLogger.warn(any, message);
  },
  info(message, any = null) {
    bunyanLogger.fields = { ...bunyanLogger.fields, ...getReqId() };
    bunyanLogger.info(any, message);
  },
  debug(message, any = null) {
    bunyanLogger.fields = { ...bunyanLogger.fields, ...getReqId() };
    bunyanLogger.debug(any, message);
  },
};
