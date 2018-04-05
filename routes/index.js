const validUrl = require('valid-url');

function getNextSequence(counter, dbs, callback) {
 dbs.production.collection('counters').findAndModify(
    { "counter": counter },
     [],
    { $inc: { seq: 1 } },
    { new: true },
    (err, doc) => err ? callback(err) : callback(null, doc.value.seq));
}


module.exports = (app, dbs) => {
  
  app.get('/', (req, res) => { 
      //    Instantiate increment collection     
      //     dbs.production.collection('counters').insert(
      //    {
      //       counter: "counter",
      //       seq: 0
      //    }
      // )
    res.json({error: 'Error: You need to add a proper url'})});
  
  app.get("/*", (req, res) => {
    
    const fullUrl = req.protocol + '://' + req.get('host') + '/';
    const url = req.params[0];

    if (!Number(url) && !validUrl.isUri(url)) {
      res.json({error: "Wrong url format, make sure you have a valid protocol and real site."});
    }
    
    if (!!Number(url)) {
      dbs.production.collection('shorten_urls').find({"short_url": Number(url)}).toArray((err, num) => {
        if (err) {
          console.log(err);
          res.error(err);
        } else if (!num[0]) {
          res.json({error: "This url is not on the database."});
        } else {
          res.redirect(num[0].url);
        }
      });
    }
    
    if (validUrl.isUri(url)) {
      dbs.production.collection('shorten_urls')
        .find({url})
        .toArray((err, urlArr) => {
          if (err) {
            console.log(err)
            res.error(err)
          } else if (!urlArr[0]) {
            getNextSequence('counter', dbs, (err, result) => {
              if(!err) {
                dbs.production.collection('shorten_urls').insert({url, short_url: result}, (err, done) => {
                   if (err) {
                      console.log(err)
                      res.error(err)
                    } else {
                      res.json({url, short_url: fullUrl + result})
                    }
                })
              }
            });
          } else {
            res.json({
                url: urlArr[0].url,
                short_url: fullUrl + urlArr[0].short_url
            })
          }
      })
    } 
  })
  return app;
}