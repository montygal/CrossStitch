const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db("sariah3tanner")
    .collection('cross-stitch')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("sariah3tanner")
    .collection('cross-stitch')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};


const createCrossStitch = async (req, res) => {
  const crossStitch = {
    theme: req.body.theme,
    color: req.body.color,
    skill: req.body.skill,
    style: req.body.style,
    size: req.body.size
  };
  const response = await mongodb.getDb().db("sariah3tanner").collection('cross-stitch').insertOne(crossStitch);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateCrossStitch = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const crossStitch = {
    theme: req.body.theme,
    color: req.body.color,
    skill: req.body.skill,
    style: req.body.style,
    size: req.body.size
  };
  const response = await mongodb
    .getDb()
    .db("sariah3tanner")
    .collection('cross-stitch')
    .replaceOne({ _id: userId }, crossStitch);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteCrossStitch = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("sariah3tanner").collection('cross-stitch').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createCrossStitch,
  updateCrossStitch,
  deleteCrossStitch
};