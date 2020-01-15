const db = require("../models");
const router = require("express").Router();

// Update 
router.route("/:id").post((req, res) => {
    db.User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

module.exports = router;