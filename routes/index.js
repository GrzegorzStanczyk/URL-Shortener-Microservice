const validUrl = require('valid-url');

module.exports = (app, dbs) => {
  
  app.get('/', (req, res) => res.json({error: 'Error: You need to add a proper url'}));
  
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
            dbs.production.collection('shorten_urls')
              .find()
              .sort({short_url:-1})
              .limit(1)
              .toArray((err, lastUrl) => {

                const newUrl = {
                  url,
                  short_url: lastUrl[0] ? lastUrl[0].short_url + 1 : 1
                }

                dbs.production.collection('shorten_urls').insertOne(newUrl, (err, docs) => {
                  if (err) {
                    console.log(err)
                    res.error(err)
                  } else {
                    res.json({
                      url: newUrl.url,
                      short_url: fullUrl + newUrl.short_url
                    })
                  }
                })
              })
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