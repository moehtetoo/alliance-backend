const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

/* GET Projects. */
router.get('/', projectsController.get);
  
/* POST Project */
router.post('/', projectsController.create);

/* PUT Project */
router.put('/:id', projectsController.update);

/* DELETE Project */
router.delete('/:id', projectsController.remove);

module.exports = router;
