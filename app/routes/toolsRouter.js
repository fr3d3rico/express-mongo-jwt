const router = require('express').Router();
const ToolSchema = require('../model/Tool');

const validateMiddleware = require('../middlewares/validate');
const verifyJWT = require('../config/verifyJWT');

router.get('/tools', verifyJWT, validateMiddleware, (req, res) => {
    var query = {};
    new Promise(resolve => {
        if( req.query.tag ) {
            query = {tags: req.query.tag};
            resolve();
        }
        resolve();
    });
    
    ToolSchema.find(query, (err, docs) => {
        if(err) return res.status(500).send({'msg':'Server error!(find): ' + err});

        if(docs) {
            if(docs.length > 0) {
                res.status(200).send(docs);
            }
            else {
                res.status(404).send({'msg':'Items not found with related tag.'});
            }
        }
        else {
            res.status(404).send({'msg':'Items not found with related tag.'});
        }
    });
});

router.post('/tools', verifyJWT, validateMiddleware, (req, res) => {
    var newTool = new ToolSchema({ title: req.body.title, link: req.body.link, description: req.body.description, tags: req.body.tags});
    newTool.save((err, tool) => {
        if(err) return res.status(500).send({'msg':'Server error!(save): ' + err});

        res.status(201).send(tool);
    });
});

router.delete('/tools/:id', verifyJWT, validateMiddleware, (req, res) => {
    if( !req.params.id ) res.status(404).send('Parameter not found!').end();

    ToolSchema.deleteOne({_id: req.params.id}, (err, result) => {
        if(err) return res.status(500).send({'msg':'Server error!(delete): ' + err}).end();;

        if(result.deletedCount === 0) {
            res.status(404).send(result).end();
        }
        else {
            res.status(200).send(result).end();
        }
    });
});

module.exports = router;