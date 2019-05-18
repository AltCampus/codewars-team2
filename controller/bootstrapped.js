var User = require('../models/User');
const fetch = require('node-fetch');

var cron = require('node-cron');

cron.schedule('* * 23,9 * *', () => {
  cronLastseven()
  cronCodewar()
});

module.exports = {
  boot_weekly: function (req, res, next) {
    cronLastseven()
  }
}

function cronLastseven() {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    else {
      users.forEach(user => {
        fetch(`https://www.codewars.com/api/v1/users/${user.username}/code-challenges/completed?page=0`)
          .then(res => res.json())
          .then(data => {
            let today = new Date().toISOString().split('T')[0];
            let weekBforeTdy = new Date();
            weekBforeTdy.setDate(new Date().getDate() - 7);
            weekBforeTdy = weekBforeTdy.toISOString().split('T')[0];

            console.log(data.data, "--------------------------")

            let lastSevenDays = data.data && data.data.filter(kata => {

              console.log(kata, '+++++++++++++++++++++++++++++++++++++')
              let completedDate = kata.completedAt.split('T')[0];
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

function cronCodewar() {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    else {
      users.forEach(user => {

        fetch(`https://www.codewars.com/api/v1/users/${user.username}`).then(res => res.json()).then(data => {
          user.codewars = data
          user.save();
        })

      })
    }
  })
}
