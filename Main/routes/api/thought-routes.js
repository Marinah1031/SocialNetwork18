const { Router } = require('express');
const thoughtController = require('../../controllers/thought-control');

const router = Router();

router
.get('/', thoughtController.getThoughts)
.get('/:thoughtId', thoughtController.getOneThought)
.post('/', thoughtController.createThought)
.put('/:thoughtId', thoughtController.updateThought)
.delete('/:thoughtId', thoughtController.deleteThought)
.post('/:thoughtId/reactions', thoughtController.addReaction)
.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;