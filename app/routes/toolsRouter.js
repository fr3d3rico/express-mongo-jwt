const router = require('express').Router();
const ToolSchema = require('../model/Tool');

router.get('/tools', (req, res) => {

    ToolSchema.find({}, (err, docs) => {
        res.status(200).send(docs);
    });
    //res.status(200).send('/tools');
});

router.post('/tools', (req, res) => {
    ToolSchema.save((err, newTool) => {
        if(err) return res.status(500).send('Server error!(save): ' + err);

        res.status(201).send(newTool);
    });
});

module.exports = router;