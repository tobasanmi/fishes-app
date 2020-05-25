const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fishRoute = require('./routes/fishes');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use('/fishes', fishRoute);
app.use(function(req,res,next){
    let err = new Error('not found');
    err.status = 404;
    next(err);
});

if(app.get('env')==='development'){
    app.use(function(err,req,res,next){
        res.status(err.status|| 500);
        res.send({
            message: err.message,
            error: err
        })
    })
}
app.listen(3000,function(){
    console.log('server started on port 3000');
});