const { Router } = require('express');
const thoughtController = require('../../controllers/thought-control');

const router = Router();

router
.get('/', thoughtController.getThoughts)
.get('/:id', thoughtController.getOneThought)
.post('/', thoughtController.createThought)
.put('/:id', thoughtController.updateThought)
.delete('/:id', thoughtController.deleteThought)
.post('/:thoughtId/reactions', thoughtController.addReaction)
.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;