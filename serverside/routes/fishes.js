const express = require('express');
const routes = express.Router();
const db = require('../db');

routes.get('/',async function(req,res,next){
    try{
        const results = await db.query('SELECT * FROM fishes')
        return res.json(results.rows);
    }
    catch (err){
        return next(err);
    }
});

routes.post('/',async function(req,res,next){
    try{
        const result = await db.query('INSERT INTO fishes (name,type) VALUES ($1,$2)', 
        [req.body.name, req.body.type]); 
        return res.json(result.rows[0]);
    }
    catch (err){
        return next(err);
    }
});
routes.patch('/:id', async function(req,res,next){
    try{
        const result = await db.query('UPDATE fishes SET name=$1 WHERE id = $2',
        [req.body.name, req.body.type, req.params.id]);
        return res.json(result.rows[0]);
    }
    catch (err){
        return next(err);
    }
});

routes.delete('/:id', async function(req,res,next){
    try{
        const result = await db.query('DELETE FROM fishes WHERE id = $1',[req.params.id]);
        return res.json({message:'deleted'});
    }
    catch(err){
        return next(err);
    }
});

module.exports = routes;