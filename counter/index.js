module.exports = (counter, dbs, callback) => {
  dbs.production.collection('counters').findAndModify(
     { "counter": counter },
      [],
     { $inc: { seq: 1 } },
     { new: true },
     (err, doc) => err ? callback(err) : callback(null, doc.value.seq));
 }
 