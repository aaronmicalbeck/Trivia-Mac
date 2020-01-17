const db = require("../models");
const router = require("express").Router();

// Read All
router.route("/").get(function(req, res){
    console.log(req.query)
    db.Question
        .find()
        .sort({ date: -1 })
        .then(dbModel => {
            console.log(dbModel)
            res.json(dbModel)
            
        })
        .catch(err => res.status(422).json(err));
})

module.exports = router;