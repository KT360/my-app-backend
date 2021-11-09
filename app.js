var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

var fs = require('fs');
var app = express();
var https = require('https');

var port = process.env.port || 3001;

app.get('/testAPI', function(req,res){
    fs.readFile('./appData.json', 'utf8',(err,jsonString) =>{
        if(err)
        {
            console.log(err);
            return;
        }else
        {
            res.end(jsonString);
        }
    })
});

app.post('/testAPI/Submit',function(req,res)
{
    if(req.body)
    {
        let newLikeCount = JSON.stringify(req.body);

        fs.writeFile('./appData.json',newLikeCount,'utf8', err =>{
            if(err)
            {
                console.error(err);
                return;
            }
            console.log("success");
        })

        
    }else
    {
        console.log("undefined");
    }
});

https.createServer(app.listen(port,() =>{
    console.log("listening at"+port);
}));
