module.exports = {
  getAllProperties: function(req, res, next) {
    const dbInstance = req.app.get('db');
    dbInstance.getAllProperties([req.session.user.id])
    .then(properties => { res.status(200).send(properties) })
  },

  getFilteredProperties: function(req, res, next) {
    const dbInstance = req.app.get('db');
    dbInstance.getFilteredProperties([req.session.user.id, req.query.rent])
    .then(properties => {res.status(200).send(properties)})
    .catch( err => {
      console.log(err);
      res.status(500).send(err);
    });
  }
}
