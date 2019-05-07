var Sequelize = require('Sequelize');


var express = require('express');

var router = express.Router();
var simpleMiddleware = require('../_helper/loggerMiddleware').simpleMiddleware;

var logger = require('../_helper/loggerMiddleware').logger;
var db = require('../sequelize');
const Op = Sequelize.Op;






var std_info = [ 'a', 'b', 'c', 'd', 'e' ];
var marks_info = [ '1', '2', '3', '4', '5' ];
var json = {name: 'asdasdasd', age:12, sex: 'f'};
var user_list = [{user: 'teacher', type: 1, password: '12345'},
    {user: 'student', type: 2, password: 'password'}
];
router.get('/new', function(req, res) {
  res.send('home page');
});

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/users/1', (req, res) => res.send('Hello World!this is one'));


router.get('/name/:name', (req, result) =>
    {
      let name = req.params.name;
      result.send('hello to-' + name);
    }
);

router.get('/api/array',simpleMiddleware,(req, res) =>
{
    res.send([1, 2, 3]);
});

router.get('/api/posts/:year/:month/:day', (req, res) =>
    {
        res.send(req.params);
    });

router.get('/api/posts/:year/:month', (req,res) =>
{
    res.send(req.query);
});



router.post('/student/add', (req, res) =>
    {
        var user_name=req.body.user;
        var password=req.body.password;
        res.send({fullname: user_name + ' ' + password});
        res.end("yes");
    }
);

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log('username', username);
    if (username === null | username === undefined | username === '') {
        res.status(404).send({message: 'error username doesnot exist'})
    } else {
        for (var i = 0; i < user_list.length; i++) {
            if (username === user_list[i].user) {
                var userData = user_list[i]
            }

        }
        console.log('userdata', userData);
        if (userData !== null && userData !== undefined) {
            if (password === userData.password) {
                res.send('logged in');
            } else {
                res.send('incorrect password');
            }
        } else {
            res.send('user doesnot exist');
        }
    }
}
);


    router.post('/login/2',logger, (req, res) => {
        console.log('req.body', req.body);
        var username = req.body.username;
        var password = req.body.password;
        console.log('username', username);
        if(username === null | username === undefined | username === '') {
            res.status(404).send({message: 'error username doesnot exist'})
        }
        else {
            for( var i =0;  i < user_list.length; i ++) {
                if( username === user_list[i].user) {
                    var userData = user_list[i]
                }

            }
            console.log('userdata', userData);
            if( userData !== null && userData !== undefined) {
                if (password === userData.password) {
                    res.send('logged in');
                }
                else {
                    res.send('incorrect password');
                }
            }
            else{
                res.send('user doesnot exist');
            }
        }


});






router.post('/students/add', (req,res) =>
{
    let name = req.params.name;
    res.send('hello' + name);

}
);

router.get('/userList', (req,res)=> {
    db.User.findAll().then(users => {
    res.send({user_list: users, message:'success'});
    });


});



router.get('/userLists', (req,res)=> {
    db.User.findAll({
        where: {
            id: {
            [Op.or]: [3,4]
            }
        }
    }
    ).then (users=> {
        res.send({user_list:users, message:'success'});
    }

)}
 )



router.get('/userList2/:id', (req,res)=> {
    let ID = req.params.id;
    db.User.findAll(
        {where: {
        id: ID
    }}) .then(users => {

        res.send({user_list: users, message:'success'});
    });


});




router.get('/userdel/:id', (req,res)=> {
    let ID = req.params.id;

    db.User.destroy(
        {where:
                {
                    id:ID
                }}).then( users => {
                    if(users==1){
                        console.log("user deleted ")
                    }
                    else {
                        console.log("not deleted")
                    }
        }
    )
});

router.post('/usercreate', (req,res)=> {

    var bodyData = req.body;
    console.log('this is body ', bodyData);
    db.User
        .create(bodyData)
        .then((user) => {

            console.log(user)
        })

        })

// router.sdafsdfsadfasfasdfsasss



router.post('/userfindchar', (req,res)=> {
    db.User.findAll({
            where: db.sequelize.where(db.sequelize.fn('char_length', db.sequelize.col('firstName')), 4)
        }).then(users => {

        // res.send({user_list: users, message:'success'});
        console.log('eeeeeeeeeeee', users);
        res.send(users);
    })
});


router.post('/userfindchar/:id', (req,res)=>{
    var ID = req.params.id;
    db.User.findAll({
        where: db.sequelize.where(db.sequelize.fn('char_length', db.sequelize.col('firstName')), ID)
    }).then(users => {

        // res.send({user_list: users, message:'success'});
        console.log('eeeeeeeeeeee', users);
        res.send(users);
    })

})

//AND
router.get('/userAND/:id', (req,res) {
    var ID = req.params.id;
    db.User.findAll({
        where:{
            id: {

            }
        }
    })

})
















module.exports = router;


