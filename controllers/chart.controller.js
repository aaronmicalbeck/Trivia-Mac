const db = require("../models");
const router = require("express").Router();

// gets all google users

router.route("/").get(function(req, res){
    console.log(req.query)
    db.User
        .find({"firstName": {$exists: true}})
        .sort({ topScore: "desc" })
        .then(dbModel => {
            console.log(dbModel)
            res.json(dbModel)
            
        })
        .catch(err => res.status(422).json(err));
})

// Read One
router.route("/:id").get((req, res) => {
    db.User
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})



module.exports = router;
