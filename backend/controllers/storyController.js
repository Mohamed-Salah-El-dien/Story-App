const Story = require("../models/storyModel");
const mongoose = require("mongoose");

// get all stories
const getStories = async (req, res) => {
  const user_id = req.user._id;

  const stories = await Story.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(stories);
};

// get a single story
const getStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Does not exist" });
  }

  const story = await Story.findById(id);

  if (!story) {
    return res.status(404).json({ error: "Does not exist" });
  }

  res.status(200).json(story);
};

// create a new story
const createStory = async (req, res) => {
  const { title, author, genres, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("The title ");
  }
  if (!author) {
    emptyFields.push("The author ");
  }
  if (!genres) {
    emptyFields.push("The genres ");
  }
  if (!body) {
    emptyFields.push("The entire story ");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "plz fill in all the fields",
      emptyFields,
    });
  }

  //add to the database
  try {
    const user_id = req.user._id;
    const story = await Story.create({ title, author, genres, body, user_id });
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a story
const deleteStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Does not exist" });
  }

  const story = await Story.findOneAndDelete({ _id: id });

  if (!story) {
    return res.status(400).json({ error: "Does not exist" });
  }

  res.status(200).json(story);
};

// update a story
const updateStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Does not exist" });
  }

  const story = await Story.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!story) {
    return res.status(400).json({ error: "Does not exist" });
  }

  res.status(200).json(story);
};

module.exports = {
  getStories,
  getStory,
  createStory,
  deleteStory,
  updateStory,
};
