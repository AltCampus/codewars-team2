var User = require('../models/User');
const fetch = require('node-fetch');


module.exports = {
  boot_weekly: function (req, res, next) {
    User.findOne({}, (err, users) => {
      if (err) return console.log(err);
      else {
        users.forEach(user => {
          fetch(`https://www.codewars.com/api/v1/users/${user.username}/code-challenges/completed?page=0`)
            .then(res => res.json())
            .then(data => {
              let lastSevenDays = data.data.filter(kata => {
                let today = new Date().toISOString().split('T')[0].join('');

                let weekBforeTdy = new Date();
                weekBforeTdy.setDate(new Date().getDate() - 7);
                weekBforeTdy = weekBforeTdy.split('T')[0].join('');

                console.log(kata)
                let completedDate = kata.completedAt.split('T')[0].join('');
                return (completedDate > weekBforeTdy && completedDate <= today)
              })

              user.prevWeek = {
                data: lastSevenDays,
                lastModified: today
              }
              user.save();

            })

        })
      }
    })
  }
}
