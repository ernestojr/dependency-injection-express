/**
 * @file Model.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import { model } from 'mongoose';
import Base from './Base';

/**
 * @class Model
 * @classdesc Model's abstract class.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Model extends Base {
  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get mongoose schema.
   * @returns {Schema} Mongoose schema.
   */
  getSchema() {
    throw new Error('This method is not implement.');
  }

  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method get model name.
   * @returns {string} Model name.
   */
  getName() {
    throw new Error('This method is not implement.');
  }

  /**
   * @method build
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @description This method build the model.
   * @returns {mongoose.Model} Mongoose model.
   */
  build() {
    return model(this.getName(), this.getSchema());
  }
}

export default Model;
