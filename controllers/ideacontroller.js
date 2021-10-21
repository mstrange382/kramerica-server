let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const { Idea } = require("../models");

router.get("/practice", validateSession, function (req, res) {
	res.send("hey! This is a practice route!");
});

console.log("ideacontroller, line 10");

router.post("/create", validateSession, function (req, res) {
	const ideaEntry = {
        name: req.body.idea.name,
		category: req.body.idea.category,
        description: req.body.idea.description,

	};
	Idea.create(ideaEntry)
		.then((post) => res.status(200).json(idea))
		.catch((err) => res.status(500).json({ error: err }));
});
console.log("idea controller, line 23");

router.get("/", function (req, res) {
	Idea.findAll()
		.then((idea) => res.status(200).json(idea))
		.catch((err) => res.status(500).json({ error: err }));
});
console.log("idea controller, line 30");

router.get("/mine", validateSession, function (req, res) {
	let userid = req.user.id;
	Idea.findAll({
		where: { owner: userid },
	})
		.then((idea) => res.status(200).json(idea))
		.catch((err) => res.status(500).json({ error: err }));
});

router.get("/:category", function (req, res) {
	let category = req.params.category;
	Idea.findAll({
		where: { category: category },
	})
		.then((idea) => res.status(200).json(idea))
		.catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
	const updateIdeaEntry = {
		name: req.body.idea.name,
		category: req.body.idea.category,
        description: req.body.idea.description,
	};
	const query = { where: { id: req.params.id, owner: req.user.id } };
	Idea.update(updateIdeaEntry, query)
		.then((ideas) =>
			res.status(200).json({ message: "The Submission has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id, owner: req.user.id } };
	Idea.destroy(query)
		.then(() =>
			res.status(200).json({ message: "Your Submission has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;