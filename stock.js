var http = require('http');
var readline = require('readline');
var fs = require('fs');


var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://alex:scott@cluster0.k60y0.mongodb.net/stocks?retryWrites=true&w=majority"



MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
    console.log("here");
    if(err) { return console.log(err); return;}
    console.log("here2");
    
    var dbo = db.db("stocks");
    var collection = dbo.collection("companies");
    
    var myFile = readline.createInterface({
        input: fs.createReadStream('companies.csv')
    });
    
    myFile.on('line', function (line) {
        const myArr = line.split(",");
        var newData = {"name" : myArr[0], "ticker" : myArr[1]};
        collection.insertOne(newData, function(err, res) {
            if (err) {console.log("querry err: " + err); return;}
            console.log("new document inserted");
        })
    
    });
    
    console.log("Success!");
    // db.close();
});


//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database