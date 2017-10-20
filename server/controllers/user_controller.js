module.exports = {
  register: function(req, res, next) {
    const dbInstance = req.app.get('db');
    dbInstance.register([req.body.username, req.body.password])
    .then(response => {
      req.session.user = response;
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  },

  login: function(req, res, next) {
    const dbInstance = req.app.get('db');
    dbInstance.login([req.body.username, req.body.password])
    .then(response => {
      req.session.user = response;
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  },

  logout: function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        res.status(500).send('Problem destroying the session', err)
      } else {
        res.status(200).send('Session destroyed');
      }
    })
  }

}
