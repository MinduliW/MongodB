const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Replace the uri string with your MongoDB deployment's connection string.
const url = 'mongodb://localhost:27017';

const dbName = "fruitsDB";


const client = new MongoClient(url, {useUnifiedTopology: true});


client.connect(function(err){
  assert.equal(null, err);
  console.log("Connection successful");

  const db = client.db(dbName);

  findDocuments(db, function(){
      client.close();
  });

});

const insertDocuments = function(db, callback){

  const collection = db.collection("fruits");

  collection.insertMany([
    {
      name : "Apple",
      score : 8,
      review : "great"
    },
    {
      name : "Orange",
      score : 6,
      review : "Sour"
    }
  ], function(err, result){
    assert.equal(err, null);
    assert.equal(2, result.result.n);
    assert.equal(2, result.ops.length);
    console.log("2 docs in list");
    callback(result);
  });

};

const findDocuments = function(db, callback){
  const collection = db.collection("fruits");

  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found following records");
    console.log(fruits);
    callback(fruits);
  });
};
