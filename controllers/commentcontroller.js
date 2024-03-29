let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const { Comment } = require("../models");

router.post("/create", validateSession, function (req, res) {
	const commentEntry = {
        name: req.body.name,
		category: req.body.category,
        description: req.body.description,
		ideaId: req.body.ideaId,
		userId: req.user.id
	};
	
	Comment.create(commentEntry)
		.then((comment) => res.status(200).json(comment))
		.catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
	const updateCommentEntry = {
		name: req.body.name,
        description: req.body.description,
		ideaId: req.body.ideaId,
		
	};
	const query = { where: { id: req.params.id,
		 userId: req.user.id } };

	Comment.update(updateCommentEntry, query)
		.then((comments) =>
			res.status(200).json({ message: "Your Comment has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id,
		userId: req.user.id } };

	Comment.destroy(query)
		.then(() =>
			res.status(200).json({ message: "Your Comment has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;