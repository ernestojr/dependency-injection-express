/**
 * @file Exception.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import reduce from 'lodash/reduce';
import CoreException from './CoreException';
import exceptionCodes from '../config/exception-codes';

/**
 * @class Exception
 * @classdesc Exception class to handler errors.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Exception extends CoreException {
  static codes = buildCodes(exceptionCodes);
  /**
   * @method constructor
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} code - Exception's code.
   * @param {string} message - Exception's message.
   * @param {object} metadata - Exception's metadata object.
   * @description This method is the constructor of class.
   */
  constructor(code, message, metadata) {
    super(code, message, metadata);
    const exceptionCode = exceptionCodes[code];
    this.statusCode = exceptionCode ? exceptionCode.statusCode : 500;
  }

  /**
   * @method handler
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {Exception|Error} error - Exception object.
   * @description This method handler the error passed as parameter.
   * @returns {object} Object with all exceptions codes.
   */
  static handler(error) {
    if (error instanceof Exception) {
      return error;
    }
    return new Exception('UNKNOW_ERROR', error.message, { error });
  }
}

/**
   * @method buildCodes
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} codes - Exception codes object.
   * @description This method build an object with the keys of the exceptions codes.
   * @returns {object} Object with all exceptions codes.
   */
function buildCodes(codes) {
  return reduce(codes, (result = {}, _, key) => {
    result[key] = key;
    return result;
  }, {});
}

export default Exception;
