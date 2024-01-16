const express = require('express');
const studioRouter = express.Router();
const { getStudios, getStudio, createStudio, updateStudio, deleteStudio} = require('../controllers/studio.controller');
const { isAuth } = require("../middlewares/auth.middleware");

studioRouter.get('/', getStudios);
studioRouter.get('/:id', getStudio);
studioRouter.post('/', createStudio);
studioRouter.patch('/:id', [isAuth], updateStudio);
studioRouter.delete('/:id', [isAuth], deleteStudio);


module.exports = studioRouter;