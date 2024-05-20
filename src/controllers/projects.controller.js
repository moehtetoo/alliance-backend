const projectsService = require('../services/projects.service');

async function get(req, res, next) {
  try {
      res.json(await projectsService.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting projects`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await projectsService.create(req.body));
  } catch (err) {
    console.error(`Error while creating project`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await projectsService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating project`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await projectsService.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting project`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};
