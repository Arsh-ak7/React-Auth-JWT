const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const Event = require("../models/Events");

router.get("/", isAuth, async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json({ events });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "server error",
		});
	}
});
router.post("/", isAuth, async (req, res) => {
	try {
		const { title, description, date } = req.body;
		try {
			const event = new Event({
				title,
				description,
				date,
			});
			const newEvent = await event.save();
			res.status(201).json({ event: newEvent });
		} catch (err) {
			console.log(err);
			res.status(500).json({
				error: "server error",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "server error",
		});
	}
});
router.put("/:id", isAuth, async (req, res) => {
	const eventID = req.params.id;
	const { title, description, date } = req.body;

	const updatedEvent = {};
	if (title) updatedEvent.title = title;
	if (description) updatedEvent.description = description;
	if (date) updatedEvent.date = date;

	const event = await Event.findByIdAndUpdate(
		eventID,
		{ $set: updatedEvent },
		{ new: true }
	);

	res.status(201).json({ event });
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server Error" });
	}
});

router.delete("/:id", isAuth, async (req, res) => {
	const eventId = req.params.id;
	try {
		await Event.findByIdAndRemove(eventId);
		res.status(200).json({ msg: "Event removed" });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: "server error",
		});
	}
});

module.exports = router;
