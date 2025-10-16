const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db("sariah3tanner").collection('cross-stitch').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("sariah3tanner")
    .collection('cross-stitch')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
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