const path = require('path');
const limitFeed = 20
const items = require('../../data/items.json')

var getProductsFeed = (feedRequest, callback) =>
{
  var min_n = 0
  var max_n = Math.floor(items.length/limitFeed)
  if(feedRequest["n"] <= max_n)
  {
    var inicio = feedRequest["n"]*limitFeed
    var fin = (feedRequest["n"]*limitFeed+limitFeed < 96)? feedRequest["n"]*limitFeed+limitFeed : 96
    callback(null, items.slice(inicio,fin))
  }
  else
  {
    callback(
      {
        'status':'error',
        'code':1,
        'desc': `El argumento "n" debe tener un valor entre ${min_n} y ${max_n}`
      },
    null)
  }
}

exports.obtenerFeed = obtenerFeed = (req, res, next) =>
{
  if(!isNaN(req.query.n))
  {
    var feedRequest =
    {
      'n': req.query.n || 0
    }
    getProductsFeed(feedRequest, (errFeed,resFeed) =>
    {
      if(errFeed)
      {
        switch (errFeed.code) {
          case 1:
            res.status(400).send(errFeed.desc)
            break;
          default:
            res.status(500).send('Error procesando la solicitud')
        }
      }
      else
      {
        res.status(200).json(resFeed)
      }
    })
  }
  else
  {
    res.status(400).send('Argumentos no válidos')
  }
}
