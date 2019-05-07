const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('employee_db', 'newuser', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });





const Post  = sequelize.define('post', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Title: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Contact: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    State: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});

const User = sequelize.define('user', {
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});



Post.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    console.log('database synchronized');

});


//
// User.sync({ force: true }).then(() => {
//     // Now the `users` table in the database corresponds to the model definition
// console.log('database synchronized');
//
// });



module.exports = {
    User,
    Sequelize,
    sequelize
}




