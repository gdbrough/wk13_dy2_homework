// const express = require('express');
// const parser = require('body-parser');
// const server = express();

// server.use(parser.json());
// server.use(parser.urlencoded({extended: true}));

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("homework");
  console.log("connected to DB");
//CRUD Stuff

  server.post("/api/bikes", function(req, res){
    const bikesCollection = db.collection("bikes");
    const bikeToSave = req.body;
    bikesCollection.save(bikeToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log("Something was saved successfully to DB");
      res.status(201);
      res.json(bikeToSave);
    });
  });

  server.get("/api/bikes", function(req, res){
    const bikesCollection = db.collection("bikes");
    bikesCollection.find().toArray(function(err, allBikes){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(allBikes);
    });
  });

  server.delete("/api/bikes", function(req, res){
    const bikesCollection = db.collection("bikes");
    // quotesCollection.deleteMany(function(err, allQuotes){
    const filterObject = {};
    bikesCollection.deleteMany(filterObject, function(err, allBikes){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  server.put("/api/bikes/:id", function(req, res){
    const bikesCollection = db.collection("bikes");
    const objectId = ObjectID(req.params.id);
    const filterObject = { _id: objectId };
    const updatedData = req.body;
    quotesCollection.update(filterObject, updatedData, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(204);
      res.send();
    });
  });

  // server.listen(3000, function(){
  //   console.log("Listening on port 3000");
  // });

});
