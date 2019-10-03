const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

function postFilter(obj) {
  return _.pick(obj, ['title','content','notebookId']);
}
/* *** TODO: Fill in the API endpoints for notes *** */
router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.post('/',(req,res) => {
  models.Note.create(postFilter(req.body))
  .then(note => res.json(note))
  .catch(err => res.status(422).json({ error: err.message }));
});

router.get('/:noteId',(req,res) => {
  models.Note.findById(req.params.noteId)
  .then(note => res.json(note))
  .catch(err => res.status(500).json({ error: err.message }));
});

router.delete('/:noteId',(req,res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.put('/:noteId',(req,res) => {
  models.Note.findById(req.params.noteId)
  .then(note=> note.update(postFilter(req.body)))
  .then(note => res.json(note))
  .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
