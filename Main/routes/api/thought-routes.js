const { Router } = require('express');
const thoughtController = require('../../controllers/thought-controller');

const router = Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = thoughtController;

router.get('/', getThoughts);
router.get('/:id', getOneThought);
router.post('/', createThought);
router.put('/:id', updateThought);
router.delete('/:id', deleteThought);
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;