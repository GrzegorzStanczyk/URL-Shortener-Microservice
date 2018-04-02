const validUrl = require('valid-url');

module.exports = (app, dbs) => {
  
  app.get("/", (req, res) => {
    
    dbs.production.collection('test').insertOne({ name: "Company Inc", address: "Highway 37" }, (err, docs) => {
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        res.json(docs).end()
      }
    })
        
    // dbs.production.collection('test').find({}).toArray((err, docs) => {
    //   if (err) {
    //     console.log(err)
    //     res.error(err)
    //   } else {
    //     res.json(docs)
    //   }
    // })
    // res.status(200).end('Error: You need to add a proper url');
  });

//   app.get("/*", (req, res) => {
//     const url = req.params[0]
//     if (!!Number(url)) {
//       res.json({
//           error: "This url is not on the database."
//         });
//     }
//     validUrl.isUri(url) 
//       ? res.send(url) 
//       : res.json({
//           error: "Wrong url format, make sure you have a valid protocol and real site."
//         });

//   })
  
  return app;
}