const { MongoClient } = require("mongodb");
require('dotenv').config()
const uri = process.env.MONGODB_URL
const mongoClient = new MongoClient(uri);

const handler = async (event) => {
    // GET MSGS
    if (event.httpMethod == "GET") {
      const clientPromise = mongoClient.connect();
      try {
        const database = (await clientPromise).db("msgDB");
        const collection = database.collection("messages");
        const cursor = await collection.find()
        var msgs = await cursor.toArray();
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: JSON.stringify(msgs)
        }
      } catch (err) {
        console.log(err)
      } finally {
        (await clientPromise).close()
      }
    // POST MSG
    } else if (event.httpMethod == "POST") {
      const clientPromise = mongoClient.connect();
      let reqData = JSON.parse(event.body)
      try {
        const database = (await clientPromise).db("msgDB");
        const collection = await database.collection("messages");
        
        await collection.insertOne({
            sender: reqData.sender,
            receiver: reqData.receiver,
            text: reqData.text,
            time: reqData.time
        })
  
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: JSON.stringify({message: "added :)"})
        }
      } catch (error) {
          return { statusCode: 500, body: error.toString() }
      } finally {
        (await clientPromise).close()
      }
    } else {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify({message: "hi"})
      }
    }
  }
  
  module.exports = { handler }