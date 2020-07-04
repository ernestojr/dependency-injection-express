/**
 * @file CoreException.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

/**
 * @class CoreException
 * @classdesc Core exception class to handler errors.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class CoreException extends Error {
  /**
   * @method constructor
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {string} code - Exception's code.
   * @param {string} message - Exception's message.
   * @param {object} metadata - Exception's metadata object.
   * @description This method is the constructor of class.
   */
  constructor(code, message, metadata = {}) {
    super(message);
    this.code = code;
    this.metadata = metadata;
  }
}

export default CoreException;
