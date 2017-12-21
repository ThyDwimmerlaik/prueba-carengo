module.exports = function(app)
{
	var controller_feed = require('./controllers/feed');

	app.route('/feed')
    	.get(controller_feed.obtenerFeed)
}
