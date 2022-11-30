const express = require("express");

const {
  getStories,
  getStory,
  createStory,
  deleteStory,
  updateStory,
} = require("../controllers/storyController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all story routes
router.use(requireAuth);

// GET all stories
router.get("/", getStories);

// GET a single story
router.get("/:id", getStory);

// Post a new story
router.post("/", createStory);

// DELETE a story
router.delete("/:id", deleteStory);

// UPDATE a story
router.patch("/:id", updateStory);

module.exports = router;
