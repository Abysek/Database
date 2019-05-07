var logger = function(req, res, next) {
    const username = req.body.username;
    if ( username === 'teacher') {
     req.body.atul = 'succesfull';
        next();
    }
    else{
        res.status(404).send('unauthenticated');
    }
}

var simpleMiddleware = function(req, res, next) {
    console.log('simple middleware activated');
    next();
}



module.exports = {
    logger: logger,
    simpleMiddleware:simpleMiddleware
}