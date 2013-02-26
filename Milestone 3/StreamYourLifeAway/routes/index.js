// GET home page

exports.index = function(req, res){
  res.render('index');
};

exports.topPlayed = function(req, res){
  res.render('topPlayed');
};

exports.search = function(req, res){
  res.render('search');
};