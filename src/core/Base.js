/**
 * @file Base.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

/**
 * @class Base
 * @classdesc Base's abstract class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Base {
  /**
   * @method constructor
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} app - Application object.
   * @description This method is the constructor of class.
   */
  constructor(app) {
    this.app = app;
  }
}

export default Base;
