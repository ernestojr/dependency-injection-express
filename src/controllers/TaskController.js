/**
 * @file TaskController.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import Base from '../core/Base';

/**
 * @class TaskController
 * @classdesc Task's controllers.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class TaskController extends Base {
  /**
   * @method create
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method create a new task.
   * @returns {Promise} Promise with operation.
   */
  create = async (req, res) => {
    const { body } = req;
    const { TaskService } = this.app.services;
    const task = await TaskService.create(body);
    res.status(201).json(task);
  };

  /**
   * @method get
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method get projects by query params.
   * @returns {Promise} Promise with operation.
   */
  get = async (req, res) => {
    const { query } = req;
    const { TaskService } = this.app.services;
    const { collection, pagination } = await TaskService.get(query);
    res.set({
      'X-Pagination-Total-Count': pagination.count,
      'X-Pagination-Limit': pagination.limit,
    });
    res.status(200);
    res.json(collection);
  };

  /**
   * @method getById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method get task by id.
   * @returns {Promise} Promise with operation.
   */
  getById = async (req, res) => {
    const { TaskService } = this.app.services;
    const {
      params: { id },
    } = req;
    const task = await TaskService.getById(id);
    res.status(200).json(task);
  };

  /**
   * @method updateById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method update task by id.
   * @returns {Promise} Promise with operation.
   */
  updateById = async (req, res) => {
    const { TaskService } = this.app.services;
    const {
      params: { id },
    } = req;
    await TaskService.updateById(id, req.body);
    res.status(204).end();
  };

  /**
   * @method deleteById
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {object} req - Express request.
   * @param {object} res - Express response.
   * @description This method delete task by id.
   * @returns {Promise} Promise with operation.
   */
  deleteById = async (req, res) => {
    const { TaskService } = this.app.services;
    const {
      params: { id },
    } = req;
    await TaskService.deleteById(id);
    res.status(204).end();
  };
}

export default TaskController;
