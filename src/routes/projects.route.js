const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
const checkJwt = require('../middlewares/checkJWT');

/* GET Projects. */
router.get('/', [checkJwt, projectsController.get]);
  
/* POST Project */
router.post('/', [checkJwt, projectsController.create]);

/* PUT Project */
router.put('/:id', [checkJwt, projectsController.update]);

/* DELETE Project */
router.delete('/:id', [checkJwt, projectsController.remove]);

module.exports = router;
