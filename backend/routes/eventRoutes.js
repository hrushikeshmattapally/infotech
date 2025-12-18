const express = require("express");
const multer = require("multer");

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const { storage } = require("../utils/cloudinary");

const router = express.Router();
const upload = multer({ storage });

/**
 * @route POST /api/events
 * @desc Create event
 * @access Private
 */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, dateTime, location, capacity } = req.body;
      const cap = Number(capacity);

      if (!title || !description || !dateTime || !location || isNaN(cap) || cap <= 0) {
        return res.status(400).json({ message: "Invalid event data" });
      }

      const event = await Event.create({
        title,
        description,
        dateTime,
        location,
        capacity: cap,
        image: req.file ? req.file.path : null,
        createdBy: req.user._id,
      });

      res.status(201).json(event);
    } catch (error) {
      console.error("CREATE EVENT ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * @route GET /api/events
 * @desc Get all upcoming events
 * @access Public
 */
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      dateTime: { $gte: today },
    })
      .sort({ dateTime: 1 })
      .populate("createdBy", "name email");

    res.json(events);
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route DELETE /api/events/:id
 * @desc Delete event (creator only)
 * @access Private
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route POST /api/events/:id/rsvp
 * @desc Join event
 * @access Private
 */
router.post("/:id/rsvp", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: "Already joined this event" });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.attendees.push(req.user._id);
    await event.save();

    res.json({ message: "Successfully joined event" });
  } catch (error) {
    console.error("RSVP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route POST /api/events/:id/unrsvp
 * @desc Leave event
 * @access Private
 */
router.post("/:id/unrsvp", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    event.attendees = event.attendees.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    await event.save();
    res.json({ message: "Successfully left event" });
  } catch (error) {
    console.error("UNRSVP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
